from transformers import AutoTokenizer, MBartForQuestionAnswering, MBartForConditionalGeneration
from transformers import  pipeline
from sentenceTokenzation import sentTokenizing
import time


# Load model directly
from transformers import AutoTokenizer, AutoModelForTokenClassification

tokenizer = AutoTokenizer.from_pretrained("sagorsarker/mbert-bengali-ner")
model = AutoModelForTokenClassification.from_pretrained("sagorsarker/mbert-bengali-ner")

pipe = pipeline('ner', model=model, tokenizer=tokenizer, grouped_entities=True)


def ner_chunk_generation_sagor_sarkar(text):
    sentence_tokens = sentTokenizing().sentTokenize(text)
    
    # print('sentence_tokens', sentence_tokens)
    
    # Record the start time
    start_time = time.time()
    
    for i in sentence_tokens:
        ner_resp = pipe(i['context'])
        # print('ner_resp', ner_resp)
        ner_arr = []
        for j in ner_resp:
            ner = {}
            ner['entity_group'] = j['entity_group']
            ner['word'] = j['word']
            ner_arr.append(ner)
        i['ner'] = ner_arr
        
    # Record the end time
    end_time = time.time()
    # Calculate the elapsed time
    elapsed_time = end_time - start_time
    print("Elapsed time:", elapsed_time, "seconds")
    
    # print('sentence_tokens', sentence_tokens)
    return sentence_tokens
      
# context = """রবীন্দ্রনাথ ঠাকুর ১৮৬১ সালে, কলকাতা শহরের এক বাংলা পরিবারে জন্মগ্রহণ করেন।"""

# QA_input = {
#     'question': 'রবীন্দ্রনাথ ঠাকুর কোন পরিবারে জন্মগ্রহণ করেন',
#     'context': context
# }

text = 'রাজধানীর ধানমন্ডি লেক থেকে আজ মঙ্গলবার সকালে সুদীপ্ত দত্ত অর্জুন নামের এক কিশোরের লাশ উদ্ধার করেছে পুলিশ। সুদীপ্ত পিলখানার বীরশ্রেষ্ঠ নূর মোহাম্মদ স্কুল অ্যান্ড কলেজের শিক্ষার্থী ছিল। সে এ বছরের এইচএসসি পরীক্ষার্থী। পরিবার ও পুলিশ সূত্রে জানা যায়, মনে ক্ষোভ নিয়ে গত রোববার বাড়ি থেকে বের হয়ে যায় অর্জুন। অর্জুনের লাশ ময়নাতদন্ত ঢাকা মেডিকেল কলেজে করা হয়েছে। তাঁর শরীরে কোনো আঘাতের চিহ্ন পাওয়া যায়নি। কলেজের ফরেনসিক বিভাগের প্রভাষক প্রদীপ কুমারের ভাষ্য, পানিতে ডুবে অর্জুনের মৃত্যু হয়েছে বলে তাঁরা প্রাথমিকভাবে ধারণা করছেন। হত্যা করা হয়েছে—এমন কোনো আলামত তাঁরা পাননি।আজ সকাল সাড়ে আটটার দিকে ধানমন্ডি লেকে একজনের লাশ ভাসতে দেখে পুলিশে খবর দেয় সেখানে ঘুরতে আসা কয়েকজন ব্যক্তি। এরপর পুলিশ গিয়ে লাশ উদ্ধার করে। অর্জুন রায়ের বাজারে তাঁর পরিবারের সঙ্গে থাকত।'

# mock_param = {"question":"সুদীপ্ত দত্ত অর্জুন কে ছিল","context":"""রাজধানীর ধানমন্ডি লেক থেকে আজ মঙ্গলবার সকালে সুদীপ্ত দত্ত অর্জুন নামের এক কিশোরের লাশ উদ্ধার করেছে পুলিশ। সুদীপ্ত পিলখানার বীরশ্রেষ্ঠ নূর মোহাম্মদ স্কুল অ্যান্ড কলেজের শিক্ষার্থী ছিল। সে এ বছরের এইচএসসি পরীক্ষার্থী। পরিবার ও পুলিশ সূত্রে জানা যায়, মনে ক্ষোভ নিয়ে গত রোববার বাড়ি থেকে বের হয়ে যায় অর্জুন। অর্জুনের লাশ ময়নাতদন্ত ঢাকা মেডিকেল কলেজে করা হয়েছে। তাঁর শরীরে কোনো আঘাতের চিহ্ন পাওয়া যায়নি।"""}
ner_chunk_generation_sagor_sarkar(text)