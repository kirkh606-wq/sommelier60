// This module fetches the original HTML course file and extracts the DAYS array
import { DAYS } from './courseData';

const SOURCE_URL = 'https://media.base44.com/files/public/user_6a0f0e616af67c9a137417e2/a435d2744_sommelier60.html';

let loaded = false;
let loadPromise = null;

export async function loadCourseData() {
  if (loaded) return DAYS;
  if (loadPromise) return loadPromise;
  
  loadPromise = (async () => {
    const res = await fetch(SOURCE_URL);
    const html = await res.text();
    
    // Find the start of the DAYS array
    const startMarker = 'const DAYS=[';
    const startIdx = html.indexOf(startMarker);
    if (startIdx === -1) {
      console.error('Could not find DAYS data in source HTML');
      return DAYS;
    }
    
    // Find matching closing bracket
    let bracketCount = 0;
    let endIdx = startIdx + startMarker.length - 1; // position of '['
    for (let i = endIdx; i < html.length; i++) {
      if (html[i] === '[') bracketCount++;
      if (html[i] === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          endIdx = i + 1;
          break;
        }
      }
      // Skip over template literals
      if (html[i] === '`') {
        i++;
        while (i < html.length && html[i] !== '`') {
          if (html[i] === '\\') i++; // skip escaped chars
          i++;
        }
      }
      // Skip over strings
      if (html[i] === '"' || html[i] === "'") {
        const quote = html[i];
        i++;
        while (i < html.length && html[i] !== quote) {
          if (html[i] === '\\') i++;
          i++;
        }
      }
    }
    
    const arrayStr = html.substring(startIdx + 'const DAYS='.length, endIdx);
    
    // Use Function constructor to evaluate the array
    // The content uses template literals which Function can handle
    const fn = new Function(`return ${arrayStr}`);
    const daysData = fn();
    
    // Clear and populate
    DAYS.length = 0;
    daysData.forEach(d => DAYS.push(d));
    
    loaded = true;
    return DAYS;
  })();
  
  return loadPromise;
}