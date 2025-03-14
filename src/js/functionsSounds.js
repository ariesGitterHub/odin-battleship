// Sound effects
import btnClick from "../assets/soundClick.mp3";
import placeShipPop from "../assets/soundPop1.mp3";
import removeShipPop from "../assets/soundPop2.mp3";
import fireAtTarget from "../assets/soundFireAtTarget.mp3";
import hitExplosion from "../assets/soundHitExplosion.mp3";
import missSplash from "../assets/soundMissSplash.mp3";
import sinkIntoDarkness from "../assets/soundSinkIntoDarkness.mp3";

// Attempts to get sound effects working more fully on:
// 1) Brave mobile - only first sound triggers after a cell is clicked
// 2) Apple Safari - spotty full execution of all sounds, then sometimes nothing
// Keep all of below as a reference (I often refer to old projects to see what I did and how I did it)

// ATTEMPT 3: Below works well on everything save for Brave mobile
// Slightly better chain of sound effects occurring on Apple's Safari

// Helper function to create and configure audio elements
function createAudioElement(src) {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
}

// Function to handle audio playback with error handling
function playAudio(audio) {
  audio.currentTime = 0; // Resets the audio to the beginning
  audio.play().catch((error) => {
    console.error("Audio playback failed:", error);
    // Optional: Trigger a fallback or prompt the user
  });
}

// Define the audio elements
const click = createAudioElement(btnClick);
const placePop = createAudioElement(placeShipPop);
const removePop = createAudioElement(removeShipPop);
const fire = createAudioElement(fireAtTarget);
const hit = createAudioElement(hitExplosion);
const miss = createAudioElement(missSplash);
const sink = createAudioElement(sinkIntoDarkness);

// Individual sound functions
export function mp3Click() {
  playAudio(click);
}

export function mp3PlacePop() {
  playAudio(placePop);
}

export function mp3RemovePop() {
  playAudio(removePop);
}

export function mp3Fire() {
  playAudio(fire);
}

export function mp3Hit() {
  playAudio(hit);
}

export function mp3Miss() {
  playAudio(miss);
}

export function mp3Sink() {
  playAudio(sink);
}

// Attack sound effects based on the result
export function attackSoundEffects(hitOrMiss) {
  setTimeout(() => {
    mp3Fire();
    if (hitOrMiss === "hit") {
      mp3Hit();
    } else {
      mp3Miss();
    }
  }, 500);
}

// ATTEMPT 2: Below works well on everything save for Brave mobile and Apple Safari

// const click = new Audio(btnClick);
// click.preload = "auto";

// export function mp3Click() {
//   click.currentTime = 0; // Resets the audio to the beginning
//   click.play().catch((error) => {
//     console.error("Audio playback failed:", error);
//   });
// }

// const placePop = new Audio(placeShipPop);
// placePop.preload = "auto";

// export function mp3PlacePop() {
//   placePop.currentTime = 0; // Resets the audio to the beginning
//   placePop.play().catch((error) => {
//     console.error("Audio playback failed:", error);
//   });
// }

// const removePop = new Audio(removeShipPop);
// removePop.preload = "auto";

// export function mp3RemovePop() {
//   removePop.currentTime = 0; // Resets the audio to the beginning
//   removePop.play().catch((error) => {
//     console.error("Audio playback failed:", error);
//   });
// }

// const fire = new Audio(fireAtTarget);
// fire.preload = "auto";

// export function mp3Fire() {
//   fire.currentTime = 0; // Resets the audio to the beginning
//   fire.play().catch((error) => {
//     console.error("Audio playback failed:", error);
//   });
// }

// const hit = new Audio(hitExplosion);
// hit.preload = "auto";

// export function mp3Hit() {
//   hit.currentTime = 0; // Resets the audio to the beginning
//   hit.play().catch((error) => {
//     console.error("Audio playback failed:", error);
//   });
// }

// const miss = new Audio(missSplash);
// miss.preload = "auto";

// export function mp3Miss() {
//   miss.currentTime = 0; // Resets the audio to the beginning
//   miss.play().catch((error) => {
//     console.error("Audio playback failed:", error);
//   });
// }

// const sink = new Audio(sinkIntoDarkness);
// sink.preload = "auto";

// export function mp3Sink() {
//   sink.currentTime = 0; // Resets the audio to the beginning
//   sink.play().catch((error) => {
//     console.error("Audio playback failed:", error);
//   });
// }

// export function attackSoundEffects(hitOrMiss) {
//   setTimeout(() => {
//       mp3Fire();
//     if (hitOrMiss === "hit") {
//       mp3Hit();
//     } else {
//       mp3Miss();
//     }
//   }, 500);
// }



// ATTEMPT 1: Below works well on everything save for Brave mobile and Apple Safari

// const click = new Audio(btnClick);
// click.preload = "auto";

// export function mp3Click() {
//   click.currentTime = 0; // Resets the audio to the beginning
//   click.play();
// }

// const placePop = new Audio(placeShipPop);
// placePop.preload = "auto";

// export function mp3PlacePop() {
//   placePop.currentTime = 0; // Resets the audio to the beginning
//   placePop.play();
// }

// const removePop = new Audio(removeShipPop);
// removePop.preload = "auto";

// export function mp3RemovePop() {
//   removePop.currentTime = 0; // Resets the audio to the beginning
//   removePop.play();
// }

// const fire = new Audio(fireAtTarget);
// fire.preload = "auto";

// export function mp3Fire() {
//   fire.currentTime = 0; // Resets the audio to the beginning
//   fire.play();
// }

// const hit = new Audio(hitExplosion);
// hit.preload = "auto";

// export function mp3Hit() {
//   hit.currentTime = 0; // Resets the audio to the beginning
//   hit.play();
// }

// const miss = new Audio(missSplash);
// miss.preload = "auto";

// export function mp3Miss() {
//   miss.currentTime = 0; // Resets the audio to the beginning
//   miss.play();
// }

// const sink = new Audio(sinkIntoDarkness);
// sink.preload = "auto";

// export function mp3Sink() {
//   sink.currentTime = 0; // Resets the audio to the beginning
//   sink.play();
// }

// export function attackSoundEffects(hitOrMiss) {
//   mp3Fire();
//   setTimeout(() => {
//     if (hitOrMiss === "hit") {
//       mp3Hit();
//     } else {
//       mp3Miss();
//     }
//   }, 500);
// }