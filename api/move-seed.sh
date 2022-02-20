files=`find src -type f -name "*.json"`;
dist='dist/src/seeds';

# create seeds 
mkdir -p $dist

# copy files
for file in $files; do
  randomName=`env LC_CTYPE=C tr -dc "a-zA-Z0-9-_\$\?" < /dev/urandom | head -c 10`
  echo "copy $file to $dist/$randomName.seed.json"
  cp $file "$dist/$randomName.seed.json" 
done;