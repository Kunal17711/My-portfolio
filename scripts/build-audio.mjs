import fs from 'node:fs';
import path from 'node:path';

// Original, sample-free ambient loop. Four overlapping sine-wave voicings,
// tuned to integer cycles so the 24-second PCM file loops without a click.
export function buildOriginalAmbient(publicRoot){
  const rate=22050,duration=24,length=rate*duration;
  const chords=[[130.81,164.81,196,246.94],[110,130.81,164.81,196],[87.31,130.81,164.81,220],[98,146.83,196,246.94]];
  const audio=Buffer.alloc(44+length*2);
  audio.write('RIFF');audio.writeUInt32LE(audio.length-8,4);audio.write('WAVEfmt ',8);
  audio.writeUInt32LE(16,16);audio.writeUInt16LE(1,20);audio.writeUInt16LE(1,22);
  audio.writeUInt32LE(rate,24);audio.writeUInt32LE(rate*2,28);audio.writeUInt16LE(2,32);audio.writeUInt16LE(16,34);
  audio.write('data',36);audio.writeUInt32LE(length*2,40);
  for(let i=0;i<length;i++){
    const t=i/rate;let value=0,weight=0;
    for(let c=0;c<chords.length;c++){
      const envelope=Math.pow((1+Math.cos(2*Math.PI*(t-c*6)/duration))/2,8);
      weight+=envelope;
      for(const frequency of chords[c]){
        const hz=Math.round(frequency*duration)/duration;
        value+=envelope*(Math.sin(2*Math.PI*hz*t)+0.12*Math.sin(2*Math.PI*hz*2*t))/4;
      }
    }
    audio.writeInt16LE(Math.round(value/Math.max(1,weight)*6500),44+i*2);
  }
  const target=path.join(publicRoot,'assets/audio/portfolio-ambient.wav');
  fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,audio);
}
