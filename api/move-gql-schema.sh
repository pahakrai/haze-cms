files=`find src -type f -name "*.gql"`;
dist='dist/src';
for file in $files; do
  destDirName=`dirname ${file/src/$dist}`;
  mkdir -p $destDirName
  cp $file ${file/src/$dist};
done;
