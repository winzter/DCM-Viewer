const express = require('express');

const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 5000;

const csv = require('csv-parser')

const cors = require("cors");

const corsOptions = { origin:'*', credentials:true, }

var make_dir = async(pathname, origin) => {

    var key = await new Promise((resolve, reject) => {
        fs.readdir(pathname, (err, files) => {
            // console.log(files);
            resolve(files)
        })
    })
    
    var tmp_arr = [];
    // console.log(key);
    for(let i=0 ;i<key.length;i++){
        if (!key[i].includes('.dcm') && !key[i].includes('.csv')){
            var obj = {};
            obj['label'] = key[i];
            var tmp_key = origin + '-' + i;
            if(origin === ''){
                tmp_key =  i.toString();
            }
            obj[`key`] = tmp_key
            var children = await make_dir(pathname + '/' + key[i], tmp_key)
            // console.log(pathname+'/'+key[i]);
            obj[`nodes`] = children
            tmp_arr.push(obj)
        }
        else{
            var obj = {};
            obj[`label`] = key[i];
            obj[`key`] = origin + '-' + i
            obj[`isOpen`] = false;
            obj[`path`] = pathname + '/' + key[i];
            tmp_arr.push(obj);
        }
    }
    return tmp_arr
}

app.use(cors(corsOptions))

app.get('/test',(req,res)=>{
  make_dir('public/siim-covid19-detection','').then((e)=>{
  res.send(e);
  })
});



app.get('/csv/*',async function(req, res){
    var origin = req.params;
    const results = [];
    fs.createReadStream(`./public/siim-covid19-detection/csv/${origin[0]}`)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.send(results)
    });
  });


app.get('/download_dcm_images/*',(req,res)=>{ 
    const images = req.params
    // console.log(images)
    res.download(`./public/siim-covid19-detection/${images[0]}`);
});

app.listen(PORT,() => console.log(`server is running on port ${PORT}`));