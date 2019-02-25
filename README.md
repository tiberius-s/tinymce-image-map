# tinymce-image-map for TinyMCE 4
### Plugin that enables you to draw shapes as image maps on an `img` through tinyMCE

This plugin was written to provide a used to draw shapes on an image in an HTML document and add the url. When done, the plugin will generate a `map` element that contains `area` elements with `coords` and `shape` and `href` properties set that correspond to the images drawn. Note: the `target` ref is always set to `_blank`. When I wrote this plugin, the use case in mind was to allow a user to embed a link in an image that will be used in an HTML email. It's not responsive, not the best pracite, I know, but some are stuck and have to do things the old fashioned way. Hopefully this plugin helps fill that gap.

## Installation

`npm i --save tinymce-image-map`

### Note: One of the devDependencies used for testing is `node-canvas`, and this may require additional libs, (cairo) on your machine.

## The development server

By running the `npm start` command you start the development server and open a browser window with an instance of TinyMCE with your plugin added to it. This window will reload automatically whenever a change is detected in the `index.html` file in the `static` folder or in one of the JavaScript files in the `src` directory.

## The production build

By running the `npm run build` command Webpack will create a `dist` directory with a child directory with the name of your plugin (tinymce-image-map) containing three files:

* `plugin.js` - the bundled plugin
* `plugin.min.js` - the bundles, uglified and minified plugin
* `LICENSE` - a file explaining the license of your plugin (copied over from `src/LICENSE`)

## Integrate plugin in your project

1. Copy the `tinymce-image-map` folder from `dist` to your project's tinymce `plugins` directory.
2. In your `tinymce.init`, add `imageMap` to `plugins`, `contextmenu`, and (_optional_) `toolbar` properties
3. Profit

## Helpful links
* TinyMCE's [Official Docs](https://www.tiny.cloud/)
* Mozilla [article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Add_a_hit_map_on_top_of_an_image) on image maps