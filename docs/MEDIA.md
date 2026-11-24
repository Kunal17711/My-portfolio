# Deployed audio

The supplied `fav-song.mp3` and unused `typing.mp3` had no license or ownership documentation. They have been removed from the migration branch and are excluded from the deployable build. Their earlier presence in repository history does not establish publication rights.

The music player's layout, controls, playback, pause, looping and volume behavior are preserved. Its default source is now `assets/audio/portfolio-ambient.wav`, generated during the build by `scripts/build-audio.mjs`. This is an original arrangement created from mathematical sine waves, with no recordings, samples or third-party track included. The generator is covered by this repository's existing ownership terms. The introduction's keyboard sounds are also synthesized by the existing Web Audio code.

To use a recorded track later, the owner must first document permission for web distribution and public playback, then replace the approved audio source and record its attribution/license here. Do not restore either supplied MP3 to the deployment without that evidence.
