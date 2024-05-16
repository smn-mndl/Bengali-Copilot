from transformers import AutoTokenizer, MBartForQuestionAnswering, MBartForConditionalGeneration
from transformers import  pipeline

model_1 = MBartForConditionalGeneration.from_pretrained('../../test2/suman_bengali_QA/Bengali_QA')
model_2 = MBartForQuestionAnswering.from_pretrained('../../test2/suman_bengali_QA/Bengali_QA')

tokenizer = AutoTokenizer.from_pretrained('../../test2/mbart-50/mbart-large-50')


pipe = pipeline('text2text-generation', model=model_1, tokenizer=tokenizer)
pipe2 = pipeline('question-answering', model=model_2, tokenizer=tokenizer, padding=True, truncation=True)

def generate_question(text):
    return pipe(text)

def generate_answer(question):
    return pipe2(question)

def format_paragraph(named_entity_obj):
    outer_obj = {}
    for i in list(named_entity_obj.keys()):
        arr = []
        for j in named_entity_obj[i]:
            obj = {}
            
            obj['sentence_no'] = list(j.keys())[0]
            text = list(j.values())[0]
            obj['sentence'] = text
            question = pipe(text)
            obj['question'] = question[0]['generated_text']
            arr.append(obj)
        outer_obj[i] = arr
    return outer_obj
      
# context = """রবীন্দ্রনাথ ঠাকুর ১৮৬১ সালে, কলকাতা শহরের এক বাংলা পরিবারে জন্মগ্রহণ করেন।"""

# QA_input = {
#     'question': 'রবীন্দ্রনাথ ঠাকুর কোন পরিবারে জন্মগ্রহণ করেন',
#     'context': context
# }
# mock_param = {"question":"সুদীপ্ত দত্ত অর্জুন কে ছিল","context":"""রাজধানীর ধানমন্ডি লেক থেকে আজ মঙ্গলবার সকালে সুদীপ্ত দত্ত অর্জুন নামের এক কিশোরের লাশ উদ্ধার করেছে পুলিশ। সুদীপ্ত পিলখানার বীরশ্রেষ্ঠ নূর মোহাম্মদ স্কুল অ্যান্ড কলেজের শিক্ষার্থী ছিল। সে এ বছরের এইচএসসি পরীক্ষার্থী। পরিবার ও পুলিশ সূত্রে জানা যায়, মনে ক্ষোভ নিয়ে গত রোববার বাড়ি থেকে বের হয়ে যায় অর্জুন। অর্জুনের লাশ ময়নাতদন্ত ঢাকা মেডিকেল কলেজে করা হয়েছে। তাঁর শরীরে কোনো আঘাতের চিহ্ন পাওয়া যায়নি।"""}
# print(generate_answer(QA_input))