GrammarBox
=

GrammarBox is a very simple webapp built using NLTK, web.py, jQuery, and Raphaël. The user types a sentence into a text box, and GrammarBox tags the tokens in the sentence and draws the appropriate Montessori part-of-speech shape above each token. 


GrammarBox is inspired by language activities in a primary Montessori classroom environment.


It is bare bones, pre-alpha-quality, and is not recommended for any practical use. Enjoy!

Setup
====

To install the python packages, `sudo pip install web.py nltk` should work. Then to download the necessary NLTK datasets,


      >>> import nltk
      >>> nltk.download('maxent_treebank_pos_tagger')
      >>> nltk.download('wordnet')


Usage
====

Run `python server.py` and then point your browser at

    http://localhost:8080/static/index.html

