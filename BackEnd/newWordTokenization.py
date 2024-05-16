import json
import pandas as pd
import numpy as np
import time

# import sparknlp
import pyspark.sql.functions as F

from pyspark.ml import Pipeline
from pyspark.sql import SparkSession
from sparknlp.annotator import *
from sparknlp.base import *
from sparknlp.pretrained import PretrainedPipeline
from pyspark.sql.types import StringType, IntegerType

from sentenceTokenzation import sentTokenizing
from startSparkNLPSession import spark

# spark = sparknlp.start()
# print ("Spark NLP Version :", sparknlp.version())

documentAssembler = DocumentAssembler() \
    .setInputCol('text') \
    .setOutputCol('document')

sentence_detector = SentenceDetector() \
    .setInputCols('document') \
    .setOutputCol('sentence')


tokenizer = Tokenizer() \
    .setInputCols(['sentence']) \
    .setOutputCol('token')

embeddings = WordEmbeddingsModel.load("../../spark-bengali-ner/bengali_cc_300d_bn_2.7.3_2.4_1612956925175") \
.setInputCols(["sentence", "token"]) \
.setOutputCol("embeddings")

ner_model = NerDLModel.load("../../spark-bengali-ner/bengaliner_cc_300d_bn_2.7.3_2.4_1612957259511") \
.setInputCols(["document", "token", "embeddings"]) \
.setOutputCol("ner")

ner_converter = NerConverter() \
    .setInputCols(['sentence', 'token', 'ner']) \
    .setOutputCol('ner_chunk')

nlp_pipeline = Pipeline(
    stages=[
        documentAssembler,
        sentence_detector,
        tokenizer,
        embeddings,
        ner_model,
        ner_converter])

def ner_chunk_generation(text):

    sentence_tokens = sentTokenizing().sentTokenize(text)
    print('sentence_tokens', sentence_tokens)
    # Record the start time
    start_time = time.time()
    
    df = spark.createDataFrame(sentence_tokens, StringType()).toDF("text")
    result = nlp_pipeline.fit(df).transform(df)
    result.selectExpr("ner_chunk.result as ner_chunk", "ner.result as ner").show(
        truncate=False
    )
    
    # Record the end time
    end_time = time.time()
    # Calculate the elapsed time
    elapsed_time = end_time - start_time
    print("Elapsed time:", elapsed_time, "seconds")
            
            
    ner_chunk_results = result.select("ner_chunk.result").collect()


    ner = []
    ner_object = {}
    all_ner = []
    for index, row in enumerate(ner_chunk_results):
        if len(row[0]) > 0 :
            # print(row[0])
            obj = {}
            obj['sentence'] = sentence_tokens[index]
            obj['ner'] = row[0]
            ner_object[index+1] = obj
        
    # for index, row in enumerate(ner_chunk_results):
    #     if len(row[0]) > 0 :
    #         ner.append(row[0])
    

    # print(ner_object)
    # print('#####################')
    return lemma_check(ner_object)
    # return ner_object

def lemma_check(ner_object):
    lemmatizer = LemmatizerModel.load('../../spark-lemma/lemma_bn_2.7.0_2.4_1611163691269')\
    .setInputCols(["token"]) \
    .setOutputCol("lemma")
    
    tokenizer = Tokenizer()\
    .setInputCols(["document"]) \
    .setOutputCol("token")

    nlp_pipeline_lemma = Pipeline(
    stages=[documentAssembler, tokenizer, lemmatizer])
    lemma_obj = {}
    for i in list(ner_object.keys()):
        # print(i)
        ner_object[i]['ner']
        df_1 = spark.createDataFrame(ner_object[i]['ner'], StringType()).toDF("text")
        # result_1 = nlp_pipeline_lemma.fit(df_1).transform(df_1)
        light_pipeline = LightPipeline(nlp_pipeline_lemma.fit(spark.createDataFrame([[""]]).toDF("text")))
        results_2 = light_pipeline.fullAnnotate(ner_object[i]['ner'])
        lemma_words = []
        for j in results_2:
            all_lemma = []
            for k in j['lemma']:
                all_lemma.append(k.result)
            lemma_words.append(all_lemma)
        lemma_obj[i] = lemma_words
        
        ner_object[i]['lemma'] = lemma_words
        # print('lemma ---', ner_object)
    return ner_object

# text = 'রাজধানীর ধানমন্ডি লেক থেকে আজ মঙ্গলবার সকালে সুদীপ্ত দত্ত অর্জুন নামের এক কিশোরের লাশ উদ্ধার করেছে পুলিশ। সুদীপ্ত পিলখানার বীরশ্রেষ্ঠ নূর মোহাম্মদ স্কুল অ্যান্ড কলেজের শিক্ষার্থী ছিল। সে এ বছরের এইচএসসি পরীক্ষার্থী। পরিবার ও পুলিশ সূত্রে জানা যায়, মনে ক্ষোভ নিয়ে গত রোববার বাড়ি থেকে বের হয়ে যায় অর্জুন। অর্জুনের লাশ ময়নাতদন্ত ঢাকা মেডিকেল কলেজে করা হয়েছে। তাঁর শরীরে কোনো আঘাতের চিহ্ন পাওয়া যায়নি। কলেজের ফরেনসিক বিভাগের প্রভাষক প্রদীপ কুমারের ভাষ্য, পানিতে ডুবে অর্জুনের মৃত্যু হয়েছে বলে তাঁরা প্রাথমিকভাবে ধারণা করছেন। হত্যা করা হয়েছে—এমন কোনো আলামত তাঁরা পাননি।আজ সকাল সাড়ে আটটার দিকে ধানমন্ডি লেকে একজনের লাশ ভাসতে দেখে পুলিশে খবর দেয় সেখানে ঘুরতে আসা কয়েকজন ব্যক্তি। এরপর পুলিশ গিয়ে লাশ উদ্ধার করে। অর্জুন রায়ের বাজারে তাঁর পরিবারের সঙ্গে থাকত।'

# mock_text = "আমার ঘরের জানালা দিয়ে রাস্তা দেখা যাচ্ছে। শিশুটি আমার টেবিলের কাছে আমার পায়ের কাছে বসেছিল, এবং তার হাঁটুতে ড্রাম বাজাচ্ছিল। আমি আমার সপ্তদশ অধ্যায়ে কঠোর পরিশ্রম করছিলাম, যেখানে নায়ক প্রতরাপ সিং সবেমাত্র নায়িকা কাঞ্চনলতাকে তার কোলে ধরেছিলেন এবং তাকে নিয়ে দুর্গের তৃতীয় গল্পের জানালা দিয়ে পালাতে চলেছেন, যখন হঠাৎ করে মিনি তার খেলা ছেড়ে জানালার কাছে দৌড়ে গেল, কাঁদতে কাঁদতে বলল, 'এ কাবুলিওয়ালা! একজন কাবুলিওয়ালা!” নিশ্চই নীচের রাস্তায় একজন কাবুলিওয়ালা, ধীরে ধীরে পাশ দিয়ে যাচ্ছিলেন। তিনি তার লোকদের ঢিলেঢালা নোংরা পোশাক পরতেন, লম্বা পাগড়ি দিয়ে; তার পিঠে একটি থলি ছিল এবং সে তার হাতে আঙ্গুরের বাক্স বহন করেছিল। এই লোকটিকে দেখে আমার মেয়ের অনুভূতি কী ছিল তা আমি বলতে পারি না, তবে সে তাকে জোরে ডাকতে শুরু করে। 'আহ!' আমি ভেবেছিলাম, 'সে আসবে, এবং আমার সপ্তদশ অধ্যায় কখনই শেষ হবে না!' ঠিক সেই মুহুর্তে কাবুলিওয়ালা মুখ ফিরিয়ে শিশুটির দিকে তাকালেন। যখন তিনি এটি দেখেন, ভয়ে কাবু হয়ে, তিনি তার মায়ের সুরক্ষায় পালিয়ে যান এবং অদৃশ্য হয়ে যান। তার একটি অন্ধ বিশ্বাস ছিল যে ব্যাগটি, যেটি বড় লোকটি বহন করেছিল, তার মধ্যে সম্ভবত তার মতো আরও দু-তিনটি শিশু ছিল। এদিকে পেলার আমার দরজায় প্রবেশ করল এবং হাসিমুখে আমাকে স্বাগত জানাল।"
# print(ner_chunk_generation(text))
# ner_chunk_generation(text)