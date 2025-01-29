//import { createElement } from "./basicFunctions.js";
import { createImg } from "./basicFunctionTemplates.js";
// import shipA5hPNG from "../assets/a5h.png";
// import sP from "../assets/ship1P.svg";
// import sC from "../assets/ship2C.svg";
// import sD from "../assets/ship3D.svg";
// import sS from "../assets/ship3S.svg";
// import sB from "../assets/ship4B.svg";
// import sA from "../assets/ship5A.svg";
// import bP from "../assets/highlight1P.svg";
// import bC from "../assets/highlight2C.svg";
// import bD from "../assets/highlight3D.svg";
// import bS from "../assets/highlight3S.svg";
// import bB from "../assets/highlight4B.svg";
// import bA from "../assets/highlight5A.svg";
// import hit1 from "../assets/hit1.svg";
// import hit2 from "../assets/hit2.svg";
// import hit3 from "../assets/hit3.svg";
// import miss1 from "../assets/miss1.svg";
// import miss2 from "../assets/miss2.svg";
// import miss3 from "../assets/miss3.svg";

// export function imgMaker(selectShip, selectHit, selectMiss) {
//   // const gameContent = document.querySelector("#game-content");
// //   const test = document.querySelector("#test");

// if (selectShip) {
//     return null
// }
// //   const a5 = createImg({
// //     src: ship5A,
// //     alt: "aircraft carrier image",
// //     class: "ship",
// //   });

// //   const b4 = createImg({
// //     src: ship4B,
// //     alt: "battleship image",
// //     class: "ship",
// //   });

// //   const d3 = createImg({
// //     src: ship3D,
// //     alt: "destroyer image",
// //     class: "ship",
// //   });

// //   const s3 = createImg({
// //     src: ship3S,
// //     alt: "submarine image",
// //     class: "ship",
// //   });

// //   const c2 = createImg({
// //     src: ship2C,
// //     alt: "corvette image",
// //     class: "ship",
// //   });

// //   const p1 = createImg({
// //     src: ship1P,
// //     alt: "patrol boat image",
// //     class: "ship",
// //   });

// if (selectHit === "h1") {
//   const h1 = createImg({
//     src: hit1,
//     alt: "explosion image",
//     class: "hit",
//   });
//   return h1
// }

// if (selectHit === "h2") {
//   const h2 = createImg({
//     src: hit2,
//     alt: "explosion image",
//     class: "hit",
//   });
//  return h2
// }

// if (selectHit === "h3") {
//   const h3 = createImg({
//     src: hit3,
//     alt: "explosion image",
//     class: "hit",
//   });
// return h3
// }

// if (selectMiss) {
//   return null;
// }
// //   const m1 = createImg({
// //     src: miss1,
// //     alt: "explosion image",
// //     class: "boom",
// //   });

// //   const m2 = createImg({
// //     src: miss2,
// //     alt: "explosion image",
// //     class: "boom",
// //   });

// //   const m3 = createImg({
// //     src: miss3,
// //     alt: "explosion image",
// //     class: "boom",
// //   });

//   // test.appendChild(a5hPNG);
// //   test.append(a5, b4, d3, s3, c2, p1);
// //   test.append(h1, h2, h3, m1, m2, m3);
// }

export function createImgShip(id, selectShip, src, classes) {
  if (selectShip === "a") {
    const a = createImg({
      id: id,
      src: src,
      alt: "aircraft carrier image",
      "data-ship": "a",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return a;
  }

  if (selectShip === "b") {
    const b = createImg({
      id: id,
      src: src,
      alt: "battleship image",
      "data-ship": "b",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return b;
  }

  if (selectShip === "d") {
    const d = createImg({
      id: id,
      src: src,
      alt: "destroyer image",
      "data-ship": "d",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return d;
  }

  if (selectShip === "s") {
    const s = createImg({
      id: id,
      src: src,
      alt: "submarine image",
      "data-ship": "s",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return s;
  }

  if (selectShip === "c") {
    const c = createImg({
      id: id,
      src: src,
      alt: "corvette image",
      "data-ship": "c",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return c;
  }

  // if (selectShip === "p") {
  //   const p = createImg({
  //     id: id,
  //     src: src,
  //     alt: "corvette image",
  //     "data-ship": "p",
  //     "data-axis": "h",
  //     "data-selected": "",
  //     class: classes,
  //   });
  //   return p;
  // }
}
