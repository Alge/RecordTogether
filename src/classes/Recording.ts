export class Recording {
  public name: string;
  public url: string;

  constructor(name: string, url: string) {
      this.name = name;
      this.url = url;
  }
  render() {
      return document.createElement('div');
      //return `${this.client} owes £${this.amount} for ${this.details}`;
  }



  render_card() {
    let card: HTMLDivElement = document.createElement('div');
    card.classList.add('recording-card');

    let recordingName: HTMLHeadingElement = document.createElement('h3');
    recordingName.innerText = this.name;

    card.appendChild(recordingName);

    let content: HTMLDivElement = document.createElement('div');
    content.classList.add('recording-card-content');

    // Video tag
    let videotag: HTMLVideoElement = document.createElement('video');
    videotag.classList.add("recording-video")
    videotag.autoplay = false;
    videotag.src=this.url;
    videotag.controls=true;

    content.appendChild(videotag);

    let controls: HTMLDivElement = document.createElement('div');
    controls.classList.add('recordingcard-controls');

    // Mute checkbox
    let muted: HTMLDivElement = document.createElement('div');
    muted.classList.add('recordingcard-controllitem');

    let muted_label: HTMLLabelElement = document.createElement('label');
    muted_label.innerText = "Mute";
    muted.appendChild(muted_label);

    let muted_checkbox: HTMLInputElement = document.createElement('input');
    muted_checkbox.setAttribute("type", "checkbox");
    muted.appendChild(muted_checkbox);

    controls.appendChild(muted);

    // Volumen controll
    let volume: HTMLDivElement = document.createElement('div');
    volume.classList.add('recordingcard-controllitem');

    let volume_label: HTMLLabelElement= document.createElement('label');
    volume_label.innerText = "Volume";
    volume.appendChild(volume_label);

    let volume_slider: HTMLInputElement = document.createElement('input');
    volume_slider.setAttribute("type", "range");
    volume_slider.setAttribute("min", "0");
    volume_slider.setAttribute("max", "100");
    volume_slider.setAttribute("value", "100");
    volume.appendChild(volume_slider);

    controls.appendChild(volume);

    // Delete video button
    let delete_video: HTMLDivElement = document.createElement('div');
    delete_video.classList.add('recordingcard-controllitem');

    let delete_video_button: HTMLButtonElement = document.createElement('button');
    delete_video_button.innerText = "Delete";
    delete_video_button.classList.add('delete-button')
    delete_video.appendChild(delete_video_button);

    delete_video_button.onclick = function(e) {
      if (e.target instanceof HTMLButtonElement) { // Needed for ts
          let evtTgt = e.target;
          evtTgt.closest(".recording-card").remove();
      }
  }


    controls.appendChild(delete_video);

    // Save video button
    let save_video: HTMLDivElement = document.createElement('div');
    save_video.classList.add('recordingcard-controllitem');

    let save_video_button: HTMLButtonElement = document.createElement('button');
    save_video_button.innerText = "save";
    save_video_button.classList.add('save-button')
    save_video.appendChild(save_video_button);

    controls.appendChild(save_video);

    content.appendChild(controls);

    card.appendChild(content);

    return card;
    }
}
