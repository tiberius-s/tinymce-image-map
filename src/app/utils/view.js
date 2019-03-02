import mapHelper from "./mapHelper";
import App from "../main";
import template from "./template.html";
import "./styles.css";

const view = {
  createDialogHtml: editor => {
    return new Promise(resolve => {
      const doc = getImageMapDocument(editor);
      const container = doc.$("#img-map-container")[0];
      container.innerHTML = template;
      resolve(doc);
    });
  },

  initApp: (editor, doc, img) => {
    const map = editor.dom
      .select("map")
      .find(item => "#" + item.name === img.useMap);
    if (!map) {
      img.useMap = "";
    }
    const areas =
      img.useMap === "" ? [] : mapHelper.load(Array.from(map.children));
    const canvas = doc.byId("img-map-canvas");
    canvas.setAttribute("height", img.height);
    canvas.setAttribute("width", img.width);
    const urlInput = doc.byId("map-url-input");
    const shapeSelectors = doc.byName("shapeSelect");
    const hint = doc.byId("img-map-hint");
    const args = {
      canvas: canvas,
      hint: hint,
      img: {
        src: img.src,
        height: img.height,
        width: img.width,
        useMap: img.useMap
      },
      map: {
        name: img.useMap,
        areas: areas
      },
      shapeSelectors: shapeSelectors,
      urlInput: urlInput
    };
    const app = new App(args);
    document.tinymceImageMap = app;
    app.init();
  },

  destroy: (editor, img) => {
    const doc = getImageMapDocument(editor);
    doc.byId("map-url-input").blur();
    mapHelper.write(editor, img);
    document.tinymceImageMap = {};
    doc.byId("img-map-container").innerHTML = "";
  }
};

function getImageMapDocument(editor) {
  return editor.windowManager
    .getWindows()
    .filter(win => {
      return Array.from(win.$("#img-map-container")).length === 1;
    })
    .map(win => {
      win.byId = function(id) {
        return this.$(`#${id}`)[0];
      };
      win.byName = function(name) {
        return Array.from(this.$(`[name=${name}]`));
      };
      return win;
    })
    .pop();
}

export default view;
