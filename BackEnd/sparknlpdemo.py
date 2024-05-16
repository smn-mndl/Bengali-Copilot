import pyspark.sql.functions as F

from pyspark.ml import Pipeline
from pyspark.sql import SparkSession
from sparknlp.annotator import *
from sparknlp.base import *
from sparknlp.pretrained import PretrainedPipeline
from pyspark.sql.types import StringType, IntegerType

from  startSparkNLPSession import spark

document_assembler = DocumentAssembler() \
.setInputCol("text") \
.setOutputCol("document")

tokenizer = Tokenizer()\
.setInputCols(["document"]) \
.setOutputCol("token")

lemmatizer = LemmatizerModel.load('../../spark-lemma/lemma_bn_2.7.0_2.4_1611163691269')\
.setInputCols(["token"]) \
.setOutputCol("lemma")

nlp_pipeline = Pipeline(stages=[document_assembler, tokenizer, lemmatizer])
light_pipeline = LightPipeline(nlp_pipeline.fit(spark.createDataFrame([[""]]).toDF("text")))

from sentenceTokenzation import unique_person_obj

def unique_person_graph(text):
    persons, sentence_tokens = unique_person_obj(text)
    print('persons', persons)
    person_keys = list(persons.keys())
    unique_persons = []
    person_obj_arr = []
    for i in person_keys:
        if len(persons[i]) > 0:
            each_person = persons[i]
            for j in each_person:
                unique_persons.append(j['original_word'])
                person_obj_arr.append(j)


    unique_persons = set(unique_persons)
    results = light_pipeline.fullAnnotate(list(unique_persons))
    
    unique_named_entity = list(unique_persons)

    named_entity = []

    for i in results:
        named_entity.append(i['lemma'][0].result)
        
    unique = list(set(named_entity))
    
    named_en_obj = {}
    for i in unique:
        info = []
        for j in person_obj_arr:
            #tokenize original word
            word = light_pipeline.fullAnnotate(j['original_word'])[0]['lemma'][0].result
            if i == word:
                temp_obj = {}
                temp_obj[j['sentence_no']] = sentence_tokens[j['sentence_no'] - 1]
                keys_pres = []
                for p in info:
                    keys_pres.append(list(p.keys())[0])
                if j['sentence_no'] not in keys_pres:
                    info.append(temp_obj)
        named_en_obj[i] = info
    print('named_en_obj', named_en_obj)
    return named_en_obj

