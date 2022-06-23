# rewrite_top_header.sh
#!/bin/bash

set -x 
IFS=:
for filename in `ls *.md`
do
	command="sed '1i $filename' $filename"
	eval $command
done
