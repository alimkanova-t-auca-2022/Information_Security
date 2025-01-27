#!/bin/bash

if [ $# -ne 1 ];
then echo "Provide directory"
	exit 1

fi

dir=$1

if [ ! -d "$dir" ];
then echo "Path is invalid"
	exit 1

fi

empty_files=$(find "$dir" -type f -empty)

if [ -z "$empty_files" ];
then echo "No empty files are found in $dir"
else 
	echo "These empty files were deleted:"
	echo "$empty_files"
	find "$dir" -type f -empty -delete
fi
