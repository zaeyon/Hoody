import {StatusBar, Dimensions} from 'react-native'

export function visibleHeight(height) {
  console.log("visibleHeight", height);
  return 700
}

export function statusBarHeight() {
  return StatusBar.currentHeight || 0
}
