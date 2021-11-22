import React, { useEffect} from "react";
import dicomParser  from "dicom-parser";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import {useParams} from'react-router-dom';
import './Dcm.css'

cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
            // Add custom headers here (e.g. auth tokens)
            //xhr.setRequestHeader('APIKEY', 'my auth token');
        }
    });

export default function DcmViewer() {
        const {...id} = useParams();

        useEffect(() => {
            // Enable the DOM Element for use with Cornerstone
            cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

            cornerstoneWADOImageLoader.configure({
            beforeSend: function(xhr) {
                // Add custom headers here (e.g. auth tokens)
                //xhr.setRequestHeader('APIKEY', 'my auth token');
            }
        });


        function loadAndViewImage(imageId) {
            var element = document.getElementById('dicomImage');

            try {
                cornerstone.loadAndCacheImage(imageId).then(function(image) {
                    var viewport = cornerstone.getDefaultViewportForImage(element, image);
                    
                    cornerstone.displayImage(element, image, viewport);

                }, function(err) {
                    console.log(err);
                });
            }
            catch(err) {
                console.log(err);
            }
        }

        function downloadAndView() {
            console.log();
            let url = `http://localhost:5000/download_dcm_images/${id[0]}`;

            // prefix the url with wadouri: so cornerstone can find the image loader
            url = "wadouri:" + url;

            // image enable the dicomImage element and activate a few tools
            loadAndViewImage(url);
        }


        var element = document.getElementById('dicomImage');
        cornerstone.enable(element);
        downloadAndView();
           
        });
          
    return(
        <div className="dcm-container">
            <div id="dicomImage" style={{height: '70vh',width: '70vh'}}></div>
        </div>
        )
  }