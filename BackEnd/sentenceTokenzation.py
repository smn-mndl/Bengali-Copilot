import nltk
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

tokenizer = AutoTokenizer.from_pretrained('../../sagorsarkar-ner/mbert-bengali-ner')
model = AutoModelForTokenClassification.from_pretrained('../../sagorsarkar-ner/mbert-bengali-ner')

nlp = pipeline("ner", model=model, tokenizer=tokenizer, grouped_entities=True)

# class sentTokenizing:
#     def sentTokenize(self,gettingText):
#         tokenizedWordsArr = []
#         dataToReSize=[]
#         data=[]
#         cleanText=''
#         for i in gettingText:
#             if i=='।' or i=='!' or i=='?':
#                 dataToReSize.append(''.join(cleanText))
#                 cleanText=''
#             else:
#                 if i=='\n' or i=='\r' or i=='”' or i=='“' or i=='"':
#                     continue
#                 else:
#                     cleanText+=i
#         # print(dataToReSize)
#         for i in dataToReSize:
#             if i[0] == ' ':
#               i = i[1:]
#             data.append(''.join(i))
#         tokenizedWordsArr.append(data)
#         return data

class sentTokenizing:
    def sentTokenize(self,gettingText):
        dataToReSize=[]
        cleanText=''
        paragraph = 1
        sentence = 1
        for index, i in enumerate(gettingText):
            if i=='।' or i=='!' or i=='?':
                # cleanText+=i
                text = ''.join(cleanText)
                text = text.strip()
                obj = {'context': text, 'paragraph': paragraph, 'sentence': sentence}
                dataToReSize.append(obj)
                cleanText=''
                sentence = sentence + 1
            else:
                if i == '\n' and gettingText[index-1] == '\n':
                    continue
                elif i=='\n':
                    paragraph = paragraph + 1
                    continue
                elif i=='\n' or i=='\r' or i=='”' or i=='“' or i=='"':
                    continue
                else:
                    cleanText+=i

        return dataToReSize
    
class word:
    def sentToWord(self, gettingData):
        cleanSent=''
        for i in gettingData:
            for j in i:
                if j=='”' or j=='“' or j=='"' or j==',' or j=='‘' or j=='’':
                    cleanSent+=' '
                    continue
                elif j=='!' or j=='?' or j=='।':
                    cleanSent+=' '
                    continue
                elif j=='(' or j=='{' or j=='}' or j=='[' or j==']':
                    cleanSent+=' '
                else:
                    if j=='-' or j==':' or j==')':
                        cleanSent+=' '
                    else:
                        # cleanSent+=' '
                        cleanSent+=j
        return nltk.word_tokenize(cleanSent)
    
def clean_word(word):
  cleanWord = ''
  for j in word:
    if j=='”' or j=='“' or j=='"' or j==',' or j=='‘' or j=='’':
      cleanWord+=' '
      continue
    elif j=='!' or j=='?' or j=='।':
      cleanWord+=' '
      continue
    elif j=='(' or j=='{' or j=='}' or j=='[' or j==']':
      cleanWord+=' '
    else:
      if j=='-' or j==':' or j==')':
        cleanWord+=' '
      else:
        # cleanWord+= ' '
        cleanWord+=j
  return cleanWord

def unique_person_obj(text):
    persons = {}

    sentence_tokens = sentTokenizing().sentTokenize(text)

    for index, j in enumerate(sentence_tokens):
        wordsArr = j.split(' ')
        person = []
        for i in wordsArr:
            cleanWord = clean_word(i)
            # tokenWord = tokenize_word(cleanWord)
            ner_results = nlp(cleanWord)
            # print('cleanWord, ner results', cleanWord, ner_results)
            for ner in ner_results:
                temp = {}
                if ner['entity_group'] == 'LABEL_1' or ner['entity_group'] == 'LABEL_2':
                    # print('ner', ner['entity_group'])
                    temp['original_word'] = cleanWord
                    temp['entity_group'] = ner['entity_group']
                    temp['ner_word'] = ner['word']
                    temp['score'] = float(ner['score'])
                    temp['sentence_no'] = index+1

                    person.append(temp)
            if len(person) > 0:
                persons[index] = person
    return persons, sentence_tokens

# text = 'রাজধানীর ধানমন্ডি লেক থেকে আজ মঙ্গলবার সকালে সুদীপ্ত দত্ত অর্জুন নামের এক কিশোরের লাশ উদ্ধার করেছে পুলিশ। সুদীপ্ত পিলখানার বীরশ্রেষ্ঠ নূর মোহাম্মদ স্কুল অ্যান্ড কলেজের শিক্ষার্থী ছিল। সে এ বছরের এইচএসসি পরীক্ষার্থী। পরিবার ও পুলিশ সূত্রে জানা যায়, মনে ক্ষোভ নিয়ে গত রোববার বাড়ি থেকে বের হয়ে যায় অর্জুন। অর্জুনের লাশ ময়নাতদন্ত ঢাকা মেডিকেল কলেজে করা হয়েছে। তাঁর শরীরে কোনো আঘাতের চিহ্ন পাওয়া যায়নি। কলেজের ফরেনসিক বিভাগের প্রভাষক প্রদীপ কুমারের ভাষ্য, পানিতে ডুবে অর্জুনের মৃত্যু হয়েছে বলে তাঁরা প্রাথমিকভাবে ধারণা করছেন। হত্যা করা হয়েছে—এমন কোনো আলামত তাঁরা পাননি।আজ সকাল সাড়ে আটটার দিকে ধানমন্ডি লেকে একজনের লাশ ভাসতে দেখে পুলিশে খবর দেয় সেখানে ঘুরতে আসা কয়েকজন ব্যক্তি। এরপর পুলিশ গিয়ে লাশ উদ্ধার করে। অর্জুন রায়ের বাজারে তাঁর পরিবারের সঙ্গে থাকত।'

# print(unique_person_obj(text))