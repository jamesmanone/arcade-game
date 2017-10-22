// Starter code from Udacity updated to webpack/es6

let resourceCache = {};
let loading = [];
let readyCallbacks = [];

const isReady = () => {
  for(let key in resourceCache)
    if(resourceCache.hasOwnProperty(key) && !resourceCache[key]) return false;
  return true;
};

const _load = url => {
  if(resourceCache[url]) return resourceCache[url];
  else {
    const img = new Image();
    img.onload = () => {
      resourceCache[url] = img;
      if(isReady()) readyCallbacks.forEach(func => func());
    };
    resourceCache[url] = false;
    img.src = url;
  }
};

export const load = (urlOrArr) => {
  if(urlOrArr instanceof Array) urlOrArr.forEach(url => _load(url));
  else _load(urlOrArr);
};

export const get = url => resourceCache[url];

export const onReady = func => readyCallbacks.push(func);




// export default function() {
//     var resourceCache = {};
//     var loading = [];
//     var readyCallbacks = [];
//
//     function load(urlOrArr) {
//         if(urlOrArr instanceof Array) {
//             urlOrArr.forEach(function(url) {
//                 _load(url);
//             });
//         } else {
//             _load(urlOrArr);
//         }
//     }
//
//     function _load(url) {
//         if(resourceCache[url]) {
//             return resourceCache[url];
//         } else {
//             var img = new Image();
//             img.onload = function() {
//                 resourceCache[url] = img;
//                 if(isReady()) {
//                     readyCallbacks.forEach(func => func());
//                 }
//             };
//             resourceCache[url] = false;
//             img.src = url;
//         }
//     }
//
//     function get(url) {
//         return resourceCache[url];
//     }
//
//     function isReady() {
//         var ready = true;
//         for(var k in resourceCache) {
//             if(resourceCache.hasOwnProperty(k) &&
//                !resourceCache[k]) {
//                 ready = false;
//             }
//         }
//         return ready;
//     }
//
//     function onReady(func) {
//         readyCallbacks.push(func);
//     }
//
//     window.Resources = {
//         load: load,
//         get: get,
//         onReady: onReady,
//         isReady: isReady
//     };
// };
