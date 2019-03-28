/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
  config.width = 1070;
  config.height = 600;
  config.filebrowserUploadUrl = 'http://23e74b3832.wicp.vip/press-invoker/ek/file/upload';
  config.image_prefillDimensions = false;
  config.extraPlugins='html5video,html5audio,lineheight,media,richcombo';
    //自定义工具栏
  config.toolbar = 'MyToolbar';//把默认工具栏改为‘MyToolbar,下面对应为toolbar_MyToolbar’
  config.toolbar_MyToolbar =
        [
            ['Source','-','Save','NewPage','Preview','Print','-','Templates'],
            ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-'],
            ['Undo', 'Redo', '-','Find','Replace','-', 'SelectAll', '-','Scayt'],
            ['Form','Checkbox','Radio','TextField','Textarea','Select','Button','ImageButton','HiddenField'],
            ['Image','Html5video','Html5audio','Media'],
            '/',
            ['Bold','Italic','Underline','Strike','Subscript','Superscript'],
            ['CopyFormatting','RemoveFormat'],
            ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote','CreateDiv'],
            ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
            ['BidiLtr','BidiRtl','Language'],
            ['Link','Unlink','Anchor'],
            ['Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'],
            '/',
            ['Styles','Format','Font','FontSize'],
            ['lineheight'],//此处不能用驼峰法
            ['TextColor','BGColor'],
            ['Maximize', 'ShowBlocks','-','About']
        ];
    //增加中文字体
  config.font_names='宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;'+ config.font_names;
};
