import { Recording } from './classes/Recording.js';



const record_button = document.querySelector('.button-record') as HTMLButtonElement;
const stop_button = document.querySelector('.button-stop') as HTMLButtonElement;
const play_all_button = document.querySelector('.button-play-all') as HTMLButtonElement;
const load_file_button = document.querySelector('.button-load-file') as HTMLButtonElement;
const recordings_list = document.querySelector('.recordings-list') as HTMLDivElement;
const mainSection = document.querySelector('.main-controls') as HTMLDivElement;
const live_webcam = document.querySelector('.live-webcam') as HTMLVideoElement;

stop_button.disabled = true;

var is_recording: Boolean = false;

// visualiser setup - create web audio api context and canvas

let audioCtx: AudioContext;
let mediaRecorder: MediaRecorder;



let r1 = new Recording("Recordingname", "http://dl5.webmfiles.org/big-buck-bunny_trailer.webm");

recordings_list.appendChild(r1.render_card());

function get_all_videos(){
    return document.getElementsByClassName('recording-video') as HTMLCollectionOf<HTMLVideoElement>;
}

function is_all_videos_stopped(){
  let videos = get_all_videos();
  for (var i = 0; i < videos.length; i++) {
    if(!videos.item(i).paused){
      return false;
    }
  }
  return true
}

function load_video(){
  let url = prompt("Enter video URL");
  let name = "imported video";

  let rec = new Recording(name, url);

  recordings_list.appendChild(rec.render_card());
}

function start_all_videos(){
    let videos = get_all_videos();
    console.log(videos);
    
    for (var i = 0; i < videos.length; i++) {
        videos.item(i).currentTime = 0;
        videos.item(i).play();
    }
}


function stop_all_videos(){
  let videos = get_all_videos();
  for (var i = 0; i < videos.length; i++) {
      (videos.item(i).pause());
  }
}

function start_recording(){
    is_recording = true;
    mediaRecorder.start();
    start_all_videos();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    record_button.style.background = "red";
    stop_button.disabled = false;
    record_button.disabled = true;
    play_all_button.disabled = true;
}

function play_all(){
  console.log("playing all videos");
  play_all_button.style.background = "green";
  stop_button.disabled = false;
  record_button.disabled = true;
  play_all_button.disabled = true;
  start_all_videos();
}

function stop_button_handler(){
    
    if (is_recording){
      is_recording = false;
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      record_button.style.background = "";
      stop_button.disabled = true;
      record_button.disabled = false;
      play_all_button.disabled = false;
    }
    else{
      console.log("playback stopped");
      play_all_button.style.background = "";
      stop_button.disabled = true;
      record_button.disabled = false;
      play_all_button.disabled = false;
      stop_all_videos();
    }
}

if (navigator.mediaDevices.getUserMedia){
    console.log("Media supported");
    
    const constraints = { audio: true, video: true};
    let chunks = [];

    let onSuccess = function(stream: MediaStream){
        
        mediaRecorder = new MediaRecorder(stream);

        live_webcam.srcObject = stream;
        live_webcam.muted=true;

        // Bind the button to start/stop once we knonw we support mediaStreams
        record_button.onclick = function(){
            start_recording();
        }

        stop_button.onclick = function(){
            stop_button_handler();
        }

        play_all_button.onclick = function(){
            play_all();
        }
        
        load_file_button.onclick = function(){
          load_video();
        }

        mediaRecorder.onstop = function(e: Event){
            console.log("data available after MediaRecorder.stop() called.");

            const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

            const blob = new Blob(chunks, { 'type' : 'video/webm; codecs=vp9' });
            console.log(blob);
            console.log(chunks);
            
            
            chunks = [];
            const videoURL = window.URL.createObjectURL(blob);

            let rec = new Recording(clipName, videoURL);

            recordings_list.appendChild(rec.render_card());

            console.log("recorder stopped");

        }
        mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
        }
    }



        
    let onError = function(err) {
        console.log('The following error occured: ' + err);
    }

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

}

else{
    console.log("media not supported");
}

document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    if(is_recording){
      stop_button_handler();
    }
    else{
      start_recording();
    }
  }
})

