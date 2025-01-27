#!/bin/bash

if [ $# -ne 2 ];
then echo "Usage of count_word: <file_name> <word>"
	exit 1
fi

file=$1
word=$2

if [ ! -f "$file" ];
then echo "File $file does not exit."
	exit 1
fi

count_words=$(grep -o -w "$word" "$file" | wc -l)
echo "The word '$word' appears $count_words times in $file."
