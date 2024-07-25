import defaultIcon from './default'
import {loadImage, prepareIcon} from "../mapUtil.js";
import {map} from "../MapView.jsx";

const icons = {
    default: defaultIcon
}

function getSVG(iconPath) {
    return `
        <svg preserveaspectratio="none" height="50" width="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">            
            ${iconPath}
        </svg>
    `
}

export default async (e, mapPalette) => {
    if (!/^[a-z]+-[a-z]+-[0-9.]+$/.test(e.id)) {
        return;
    }
    if (map.hasImage(e.id)) {
        return;
    }
    const [category, color, rotation] = e.id.split('-')

    const iconPath = icons[category](rotation, color, mapPalette);
    const svg = getSVG(iconPath)
    const svgBlob = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});
    const image = await loadImage(URL.createObjectURL(svgBlob))
    if (!map.hasImage(e.id)) {
        map.addImage(e.id, prepareIcon(image), {
            pixelRatio: window.devicePixelRatio,
        })
    }
}
