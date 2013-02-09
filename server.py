import web
import nltk
import nltk.tag, nltk.data
import json
from nltk.stem.wordnet import WordNetLemmatizer

default_tagger = nltk.data.load(nltk.tag._POS_TAGGER)
model = {
    # verbs
    'eat': 'VB',
    'eats': 'VB',
    'bark': 'VB',
    'chase': 'VB',
    'wash': 'VB',
    'swim': 'VB',
    'study': 'VB',
    'jump': 'VB',
    'hang': 'VB',
    # adjectives
    'brown': 'JJ',
    'red': 'JJ',
    # nouns
    'fish':'NN',
    'dish':'NN'
    }

tagger = nltk.tag.UnigramTagger(model=model, 
                                backoff=default_tagger,
                                cutoff=1)

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
            tags = tagger.tag(tokens)
            return json.dumps(
                [list(tag) + [gram]
                 for tag, gram in zip(tags, grams)])


if __name__ == "__main__":
    app.run()
