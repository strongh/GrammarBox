import web
import nltk
import json
from nltk.stem.wordnet import WordNetLemmatizer

urls = (
    '/(.*)', 'GrammarBox'
    )

app = web.application(urls, globals())

Lemmatizer = WordNetLemmatizer()

class GrammarBox:
    def GET(self, text):
        if text:
            grams = nltk.word_tokenize(text)
            tokens = [Lemmatizer.lemmatize(token) 
                      for token in grams]
            tags = nltk.pos_tag(tokens)
            return json.dumps(
                [list(tag) + [token]
                 for tag, token in zip(tags, grams)])


if __name__ == "__main__":
    app.run()
