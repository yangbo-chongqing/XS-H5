import api from '@/request/xsdt';
import { Icon, Col, Row, Search, List, Popup, Uploader, Checkbox, CheckboxGroup, Cell, CellGroup, Field, Picker } from 'vant';
import VueUeditorWrap from "vue-ueditor-wrap";

// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// import { quillEditor } from 'vue-quill-editor'
import axios from "axios";
import Exif from "exif-js";

export default {
  name: 'Home',
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow: Row,
    VanSearch: Search,
    VanList: List,
    VanPopup: Popup,
    VanUploader: Uploader,
    VanCheckbox: Checkbox,
    VanCheckboxGroup: CheckboxGroup,
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanField: Field,
    VanPicker: Picker,
    // quillEditor:quillEditor,
    VueUeditorWrap,
  },
  data() {
    return {
      id: this.$route.query.id,
      relics_id: this.$route.query.muse_id,
      show: false,
      value: '',
      editor_data: '',
      A_show: false,
      editor: '',
      name: '',
      edit_show: false,
      entrySelectData: [],
      entryClassification: [],
      entry_Classification: [],
      entrySelectData_id: 0,
      showEntryClassification: false,
      entryClassificationValue: '',
      content: "",
      videoUrl: '',
      linkContent: '',
      linkhref: 'http://',
      list: [],
      fram: {}, //指向
      result: [],
      html: '',
      onHtml: '',
      htmls: '',
      boldcolor: false,
      italiccolor: false,
      underlineccolor: false,
      h1color: false,
      h2color: false,
      strikecolor: false,
      leftcolor: false,
      centercolor: false,
      rightcolor: false,
      insertorderedlistcolor: false,
      insertunorderedlistcolor: false,
      blockquote: false,
      // 图片
      files: {
        name: "",
        type: ""
      },
      fileList: [],
      indeximg: '',
      cover_show: false,
      ueConfig: {
        toolbars: [],
        labelMap: {},
        catchRemoteImageEnable: true,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: "100%",
        enableAutoSave: false,
        elementPathEnable: false,
        wordCount: false,
        serverUrl: "/api/store/ueditor/config",
        UEDITOR_HOME_URL: "/UEditor/",
        enableContextMenu: false,
        zIndex: 50,
        // elementPathEnabled:true,
      },
      ueData: "",
      defaultPhoneHeight: '',
      nowPhoneHeight: '',
    }
  },
  computed: {

  },
  created() {
    localStorage.setItem('id', this.id)
    localStorage.setItem('relics_id', this.relics_id)

  },
  mounted() {
    this.getdata();
    this.getEntryClassification();
    // this.getUser();
    // this.getpolicy();
    this.defaultPhoneHeight = window.innerHeight
    window.onresize = () => {
      this.nowPhoneHeight = window.innerHeight
    }
  },
  methods: {
    //页面跳转
    jumpRoute(path, obj) {
      this.$router.push({
        path: path,
        query: {
          ...obj
        }
      })
    },
    showPopup() {
      this.show = true;
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    onConfirm(value) {
      this.entryClassificationValue = value.text;
      this.entrySelectData_id = value.id;
      this.showEntryClassification = false;

    },
    // 配置按钮
    ready(editorInstance) {
      this.editor = editorInstance;
    },
    execCommands(name) {
      // console.log(name)
      // console.log(this.editor )
      this.editor.execCommand(name)
      if (name == 'blockquote') {
        if (this.blockquote) {
          this.blockquote = false;
        } else {
          this.blockquote = true;
        }
      }
      if (name == 'insertorderedlist') {
        if (this.insertorderedlistcolor) {
          this.insertorderedlistcolor = false;
        } else {
          this.insertorderedlistcolor = true;
        }
      }
      if (name == 'insertunorderedlist') {
        if (this.insertunorderedlistcolor) {
          this.insertunorderedlistcolor = false;
        } else {
          this.insertunorderedlistcolor = true;
        }
      }
      if (name == 'removeformat') {
        this.centercolor = false;
        this.leftcolor = false;
        this.rightcolor = false;
        this.boldcolor = false;
        this.italiccolor = false;
        this.underlineccolor = false;
        this.strikecolor = false;
      }
    },
    //搜索相关词条
    getSearch() {
      let data = {
        keyword: this.value,
      }
      if (this.value !== undefined) {
        api.postrelated(this.qs.stringify(data)).then((res) => {
          console.log(res)
          if (res.status == "200") {
            this.list = res.data.list
          }
        });
      }
    },
    getUser() {
      if (window.localStorage.getItem('storage') == null) {
        // console.log(1);
        this.Show = true;
        this.$router.push({
          path: '/toke',
        });
      } else {
        let data = {
          'relics_id': this.id,
        }
        api.ScanCode(data).then((res) => {
          if (res.status === 200) {
          } else if (res.status === 401) {
            this.$router.push({
              path: '/toke',
            });
          }
        }).then((err) => {
          // console.log(err)
        })
      }
    },
    closeVideo() {
      document.querySelector('.Upload-video').setAttribute('style', 'display:none')
    },
    //添加视频
    addVideo() {
      // let myTextEditor = this.$refs.myTextEditor.quill
      // // 获取光标所在位置
      // let length = myTextEditor.getSelection().index;
      // // 插入图片，res为服务器返回的图片链接地址
      // myTextEditor.insertEmbed(length, 'video', this.videoUrl)
      // // 调整光标到最后
      // myTextEditor.setSelection(length + 1)
      if (this.videoUrl) {
        let video = `<p><video class="a-href-icon" max-width='100%' style='margin-top:5px;z-index: 0' src='${this.videoUrl}' controls  webkit-playsinline="true" x5-video-player-type="h5" x5-video-orientation="portraint" poster='${this.videoUrl}?vframe/jpg/offset/0/w/325/h200' > </video><p>`;
        // this.insertImg(img)
        this.editor.execCommand('inserthtml', video)
        document.querySelector('.Upload-video').setAttribute('style', 'display:none')
      }

    },
    onlink() {
      document.querySelector('.Upload-link').setAttribute('style', 'display:block')
    },
    addlink() {
      if (this.linkContent && this.linkhref) {
        let link = `<p><a href="${this.linkhref}" target="_blank" > ${this.linkContent}</a><p>`
        this.editor.execCommand('inserthtml', link)
        document.querySelector('.Upload-link').setAttribute('style', 'display:none')
      }
    },
    closelink() {
      document.querySelector('.Upload-link').setAttribute('style', 'display:none')
    },

    onimage() {
      // console.log(document.querySelector('.Upload-image input'))
      document.querySelector('.Upload-image input').click()

    },
    onvideo() {
      document.querySelector('.Upload-video').setAttribute('style', 'display:inline-block')
      document.querySelector('.Upload-link').setAttribute('style', 'display:none')
    },
    updateOrDelete(e, index) {
      this.onHtml = e;

      // console.log(e.target.tagName)
      // console.log(e)
      // console.log(e)
      if (index == 1) {
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'p' || e.path[i].localName == 'h1' || e.path[i].localName == 'h2') {
            // console.log(e.path[i].style)
            // e.path[i].localName = 'h1'
            // this.html = e.path[i].remove();
            e.path[i].outerHTML = this.htmls
            this.htmls = '';
          }
        }
      } else {
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'p' || e.path[i].localName == 'h1' || e.path[i].localName == 'h2') {
            // console.log(e.path[i].style)
            // e.path[i].localName = 'h1'
            // this.html = e.path[i].remove();
            if (index == 1) {
              e.path[i].outerHTML = this.htmls
              this.htmls = '';
            } else {
              this.htmls = e.path[i].outerHTML
            }
            this.html = e.path[i];
          }
        }
        this.h1color = false;
        this.h2color = false;
        this.insertorderedlistcolor = false;
        this.insertunorderedlistcolor = false;
        this.blockquote = false;
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'h1') {
            this.h1color = true;
            if (e.path[i].style) {
              if (e.path[i].style.textAlign) {
                if (e.path[i].style.textAlign == 'center') {
                  this.centercolor = true;
                  this.leftcolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'left') {
                  this.leftcolor = true;
                  this.centercolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'right') {
                  this.rightcolor = true;
                  this.centercolor = false;
                  this.leftcolor = false;
                }
              } else {
                // console.log('dsdsd')
                this.centercolor = false;
                this.leftcolor = false;
                this.rightcolor = false;
              }
              if (e.path[i].style.fontWeight) {
                if (e.path[i].style.fontWeight == '700') {
                  this.boldcolor = true;
                }
              } else {
                this.boldcolor = false;
              }
              if (e.path[i].style.fontStyle) {
                if (e.path[i].style.fontStyle == 'oblique') {
                  this.italiccolor = true;
                }
              } else {
                this.italiccolor = false;
              }

              if (e.path[i].style.textDecoration) {
                if (e.path[i].style.textDecoration == 'line-through') {
                  this.strikecolor = true;
                  this.underlineccolor = false;
                }
                if (e.path[i].style.textDecoration == 'underline') {
                  this.underlineccolor = true;
                  this.strikecolor = false;
                }
              } else {
                this.strikecolor = false;
                this.underlineccolor = false;
              }
            } else {
              this.centercolor = false;
              this.leftcolor = false;
              this.rightcolor = false;
              this.boldcolor = false;
              this.italiccolor = false;
              this.underlineccolor = false;
              this.strikecolor = false;
            }
          } else {
            // this.h1color = false;
            // this.h2color = false;
            // this.insertorderedlistcolor = false;
            // this.insertunorderedlistcolor = false;
          }
        }
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'h2') {
            this.h2color = true;
            if (e.path[i].style) {
              if (e.path[i].style.textAlign) {
                if (e.path[i].style.textAlign == 'center') {
                  this.centercolor = true;
                  this.leftcolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'left') {
                  this.leftcolor = true;
                  this.centercolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'right') {
                  this.rightcolor = true;
                  this.centercolor = false;
                  this.leftcolor = false;
                }
              } else {
                // console.log('dsdsd')
                this.centercolor = false;
                this.leftcolor = false;
                this.rightcolor = false;
              }
              if (e.path[i].style.fontWeight) {
                if (e.path[i].style.fontWeight == '700') {
                  this.boldcolor = true;
                }
              } else {
                this.boldcolor = false;
              }
              if (e.path[i].style.fontStyle) {
                if (e.path[i].style.fontStyle == 'oblique') {
                  this.italiccolor = true;
                }
              } else {
                this.italiccolor = false;
              }

              if (e.path[i].style.textDecoration) {
                if (e.path[i].style.textDecoration == 'line-through') {
                  this.strikecolor = true;
                  this.underlineccolor = false;
                }
                if (e.path[i].style.textDecoration == 'underline') {
                  this.underlineccolor = true;
                  this.strikecolor = false;
                }
              } else {
                this.strikecolor = false;
                this.underlineccolor = false;
              }
            } else {
              this.centercolor = false;
              this.leftcolor = false;
              this.rightcolor = false;
              this.boldcolor = false;
              this.italiccolor = false;
              this.underlineccolor = false;
              this.strikecolor = false;
            }
          } else {
            // this.h1color = false;
            // this.h2color = false;
            // this.insertorderedlistcolor = false;
            // this.insertunorderedlistcolor = false;
          }
        }
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'ol') {
            this.insertorderedlistcolor = true;
            if (e.path[i].style) {
              if (e.path[i].style.textAlign) {
                if (e.path[i].style.textAlign == 'center') {
                  this.centercolor = true;
                  this.leftcolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'left') {
                  this.leftcolor = true;
                  this.centercolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'right') {
                  this.rightcolor = true;
                  this.centercolor = false;
                  this.leftcolor = false;
                }
              } else {
                // console.log('dsdsd')
                this.centercolor = false;
                this.leftcolor = false;
                this.rightcolor = false;
              }
              if (e.path[i].style.fontWeight) {
                if (e.path[i].style.fontWeight == '700') {
                  this.boldcolor = true;
                }
              } else {
                this.boldcolor = false;
              }
              if (e.path[i].style.fontStyle) {
                if (e.path[i].style.fontStyle == 'oblique') {
                  this.italiccolor = true;
                }
              } else {
                this.italiccolor = false;
              }

              if (e.path[i].style.textDecoration) {
                if (e.path[i].style.textDecoration == 'line-through') {
                  this.strikecolor = true;
                  this.underlineccolor = false;
                }
                if (e.path[i].style.textDecoration == 'underline') {
                  this.underlineccolor = true;
                  this.strikecolor = false;
                }
              } else {
                this.strikecolor = false;
                this.underlineccolor = false;
              }
            } else {
              this.centercolor = false;
              this.leftcolor = false;
              this.rightcolor = false;
              this.boldcolor = false;
              this.italiccolor = false;
              this.underlineccolor = false;
              this.strikecolor = false;
            }
          } else {
            // this.h1color = false;
            // this.h2color = false;
            // this.insertorderedlistcolor = false;
            // this.insertunorderedlistcolor = false;
          }
        }
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'ul') {
            this.insertunorderedlistcolor = true;
            if (e.path[i].style) {
              if (e.path[i].style.textAlign) {
                if (e.path[i].style.textAlign == 'center') {
                  this.centercolor = true;
                  this.leftcolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'left') {
                  this.leftcolor = true;
                  this.centercolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'right') {
                  this.rightcolor = true;
                  this.centercolor = false;
                  this.leftcolor = false;
                }
              } else {
                // console.log('dsdsd')
                this.centercolor = false;
                this.leftcolor = false;
                this.rightcolor = false;
              }
              if (e.path[i].style.fontWeight) {
                if (e.path[i].style.fontWeight == '700') {
                  this.boldcolor = true;
                }
              } else {
                this.boldcolor = false;
              }
              if (e.path[i].style.fontStyle) {
                if (e.path[i].style.fontStyle == 'oblique') {
                  this.italiccolor = true;
                }
              } else {
                this.italiccolor = false;
              }

              if (e.path[i].style.textDecoration) {
                if (e.path[i].style.textDecoration == 'line-through') {
                  this.strikecolor = true;
                  this.underlineccolor = false;
                }
                if (e.path[i].style.textDecoration == 'underline') {
                  this.underlineccolor = true;
                  this.strikecolor = false;
                }
              } else {
                this.strikecolor = false;
                this.underlineccolor = false;
              }
            } else {
              this.centercolor = false;
              this.leftcolor = false;
              this.rightcolor = false;
              this.boldcolor = false;
              this.italiccolor = false;
              this.underlineccolor = false;
              this.strikecolor = false;
            }
          } else {
            // this.h1color = false;
            // this.h2color = false;
            // this.insertorderedlistcolor = false;
            // this.insertunorderedlistcolor = false;
          }
        }
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'blockquote') {
            this.blockquote = true;
            if (e.path[i].style) {
              if (e.path[i].style.textAlign) {
                if (e.path[i].style.textAlign == 'center') {
                  this.centercolor = true;
                  this.leftcolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'left') {
                  this.leftcolor = true;
                  this.centercolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'right') {
                  this.rightcolor = true;
                  this.centercolor = false;
                  this.leftcolor = false;
                }
              } else {
                // console.log('dsdsd')
                this.centercolor = false;
                this.leftcolor = false;
                this.rightcolor = false;
              }
              if (e.path[i].style.fontWeight) {
                if (e.path[i].style.fontWeight == '700') {
                  this.boldcolor = true;
                }
              } else {
                this.boldcolor = false;
              }
              if (e.path[i].style.fontStyle) {
                if (e.path[i].style.fontStyle == 'oblique') {
                  this.italiccolor = true;
                }
              } else {
                this.italiccolor = false;
              }

              if (e.path[i].style.textDecoration) {
                if (e.path[i].style.textDecoration == 'line-through') {
                  this.strikecolor = true;
                  this.underlineccolor = false;
                }
                if (e.path[i].style.textDecoration == 'underline') {
                  this.underlineccolor = true;
                  this.strikecolor = false;
                }
              } else {
                this.strikecolor = false;
                this.underlineccolor = false;
              }
            } else {
              this.centercolor = false;
              this.leftcolor = false;
              this.rightcolor = false;
              this.boldcolor = false;
              this.italiccolor = false;
              this.underlineccolor = false;
              this.strikecolor = false;
            }
          } else {
            // this.h1color = false;
            // this.h2color = false;
            // this.insertorderedlistcolor = false;
            // this.insertunorderedlistcolor = false;
          }
        }
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'p') {
            // console.log(e.path[i])
            if (e.path[i].style) {
              if (e.path[i].style.textAlign) {
                if (e.path[i].style.textAlign == 'center') {
                  this.centercolor = true;
                  this.leftcolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'left') {
                  this.leftcolor = true;
                  this.centercolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'right') {
                  this.rightcolor = true;
                  this.centercolor = false;
                  this.leftcolor = false;
                }
              } else {
                // console.log('dsdsd')
                this.centercolor = false;
                this.leftcolor = false;
                this.rightcolor = false;
              }
              if (e.path[i].style.fontWeight) {
                if (e.path[i].style.fontWeight == '700') {
                  this.boldcolor = true;
                }
              } else {
                this.boldcolor = false;
              }
              if (e.path[i].style.fontStyle) {
                if (e.path[i].style.fontStyle == 'oblique') {
                  this.italiccolor = true;
                }
              } else {
                this.italiccolor = false;
              }

              if (e.path[i].style.textDecoration) {
                if (e.path[i].style.textDecoration == 'line-through') {
                  this.strikecolor = true;
                  this.underlineccolor = false;
                }
                if (e.path[i].style.textDecoration == 'underline') {
                  this.underlineccolor = true;
                  this.strikecolor = false;
                }
              } else {
                this.strikecolor = false;
                this.underlineccolor = false;
              }
            } else {
              this.centercolor = false;
              this.leftcolor = false;
              this.rightcolor = false;
              this.boldcolor = false;
              this.italiccolor = false;
              this.underlineccolor = false;
              this.strikecolor = false;
            }
          }
        }
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].localName == 'span') {
            // console.log(e.path[i])
            if (e.path[i].style) {
              if (e.path[i].style.textAlign) {
                if (e.path[i].style.textAlign == 'center') {
                  this.centercolor = true;
                  this.leftcolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'left') {
                  this.leftcolor = true;
                  this.centercolor = false;
                  this.rightcolor = false;
                }
                if (e.path[i].style.textAlign == 'right') {
                  this.rightcolor = true;
                  this.centercolor = false;
                  this.leftcolor = false;
                }
              } else {
                // console.log('dsdsd')
                this.centercolor = false;
                this.leftcolor = false;
                this.rightcolor = false;
              }
              if (e.path[i].style.fontWeight) {
                if (e.path[i].style.fontWeight == '700') {
                  this.boldcolor = true;
                }
              } else {
                this.boldcolor = false;
              }
              if (e.path[i].style.fontStyle) {
                if (e.path[i].style.fontStyle == 'oblique') {
                  this.italiccolor = true;
                }
              } else {
                this.italiccolor = false;
              }

              if (e.path[i].style.textDecoration) {
                if (e.path[i].style.textDecoration == 'line-through') {
                  this.strikecolor = true;
                  this.underlineccolor = false;
                }
                if (e.path[i].style.textDecoration == 'underline') {
                  this.underlineccolor = true;
                  this.strikecolor = false;
                }
              } else {
                this.strikecolor = false;
                this.underlineccolor = false;
              }
            } else {
              this.centercolor = false;
              this.leftcolor = false;
              this.rightcolor = false;
              this.boldcolor = false;
              this.italiccolor = false;
              this.underlineccolor = false;
              this.strikecolor = false;
            }
          }
        }
      }
    },
    ontitle(index) {
      if (this.htmls != '') {
        if (index == 1) {
          if (this.h1color) {
            this.htmls = this.htmls.replace(/h1/g, "p");
            this.h1color = false;
          } else {
            this.htmls = this.htmls.replace(/&nbsp;/g, " ");
            this.htmls = this.htmls.replace(/h2/g, "h1");
            this.htmls = this.htmls.replace(/p/g, "h1");
            this.h2color = false;
            this.h1color = true;
          }
        } else if (index == 2) {
          if (this.h2color) {
            this.htmls = this.htmls.replace(/h2/g, "p");
            this.h2color = false;
          } else {
            this.htmls = this.htmls.replace(/&nbsp;/g, " ");
            this.htmls = this.htmls.replace(/p/g, "h2");
            this.htmls = this.htmls.replace(/h1/g, "h2");
            this.h1color = false;
            this.h2color = true;
          }
        }
        // this.htmls = this.htmls.replace(/p/g,"h1");
        // this.htmls = this.htmls.replace(/p/g,"h2");
        this.updateOrDelete(this.onHtml, 1);
        this.html = '';
      }
    },
    justify(index) {
      if (this.html != '') {
        if (index == 1) {
          if (!this.leftcolor) {
            this.leftcolor = true;
            this.centercolor = false;
            this.rightcolor = false;
            this.html.style.setProperty('text-align', 'left');
          } else {
            this.html.style.setProperty('text-align', '');
            this.leftcolor = false;
          }
        } else if (index == 2) {
          if (!this.centercolor) {
            this.centercolor = true;
            this.leftcolor = false;
            this.rightcolor = false;
            this.html.style.setProperty('text-align', 'center');
          } else {
            this.html.style.setProperty('text-align', '');
            this.centercolor = false;
          }
          // console.log(index)
        } else if (index == 3) {
          if (!this.rightcolor) {
            this.rightcolor = true;
            this.centercolor = false;
            this.leftcolor = false;
            this.html.style.setProperty('text-align', 'right');
          } else {
            this.html.style.setProperty('text-align', '');
            this.rightcolor = false;
          }
        } else if (index == 4) {
          if (!this.boldcolor) {
            this.boldcolor = true;
            this.html.style.setProperty('font-weight', '700');
          } else {
            this.html.style.setProperty('font-weight', '');
            this.boldcolor = false;
          }
        } else if (index == 5) {
          if (!this.italiccolor) {
            this.italiccolor = true;
            this.html.style.setProperty('font-style', 'oblique');
          } else {
            this.html.style.setProperty('font-style', '');
            this.italiccolor = false;
          }
        } else if (index == 6) {
          if (!this.underlineccolor) {
            this.underlineccolor = true;
            this.strikecolor = false;
            this.html.style.setProperty('text-decoration', 'underline');
          } else {
            this.html.style.setProperty('text-decoration', '');
            this.underlineccolor = false;
          }
        } else if (index == 7) {
          if (!this.strikecolor) {
            this.strikecolor = true;
            this.underlineccolor = false;
            this.html.style.setProperty('text-decoration', 'line-through');
          } else {
            this.html.style.setProperty('text-decoration', '');
            this.strikecolor = false;
          }
        }
      }
    },
    upkeydown(e) {
      // console.log(e.target.childNodes)

      // //获取百度编辑器的工具类
      // let domUtils = UE.dom.domUtils
      // let bk_start = this.editor.selection.getRange().createBookmark().start // 创建一个临时dom，用于获取当前光标的坐标
      // bk_start.style.display = '' // 设置临时dom不隐藏
      // let top = domUtils.getXY(bk_start).y;
      // // // console.log(bk_start)
      // console.log(top,'top')
      // //移除临时dom
      // bk_start.remove();
      if (e.key == 'Enter') {

        this.h1color = false;
        this.h2color = false;
        this.centercolor = false;
        this.leftcolor = false;
        this.rightcolor = false;
        this.html = '';
      }
    },
    upinput(index, item, $event) {
      console.log(index)

      // let quill = this.$refs.singleText.iframe;
      // let length = quill.selection.savedRange.index;
      // console.log(length)
    },

    //上传图片
    afterRead(index) {
      // 此时可以自行将文件上传至服务器
      return file => {
        this.indeximg = index;
        this.$toast.loading({
          message: '上传中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        this.files.name = file.file.name // 获取文件名
        this.files.type = file.file.type // 获取类型
        this.imgPreview(file.file)
        console.log(this.fileList)
      }
    },
    //上传视频
    afterVideo(file) {
      // 此时可以自行将文件上传至服务器
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.getpolicy(file.file)
    },
    // 获取七牛云token
    getpolicy(file) {
      let data = {
        suffix: file.type.split('/')[1],
      };
      api.postqiniu(data).then((res) => {
        if (res.status == "200") {
          // console.log(res)
          this.qiniuyunUpload(file, res.data.data)
        }
      });
    },
    // 上传七牛云
    qiniuyunUpload(file, qiniuyunToken) {
      let formData = new FormData();
      //注意formData里append添加的键的大小写
      formData.append('key', qiniuyunToken.key)
      formData.append('token', qiniuyunToken.upToken)
      //如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
      formData.append("file", file);
      axios.post('http://upload.qiniup.com', formData, {
        'Content-Type': 'multipart/form-data'
      }).then(res => {
        if (res.status == 200) {
          let img_url = 'https://voice.xunsheng.org.cn/' + res.data.key;
          if (file.type.split('/')[0] == 'image') {

            if (this.indeximg === 1) {
              this.fileList = [];
              this.fileList.push({
                url: img_url
              })
            } else {
              let img = `<p> <img class="a-href-icon" max-width='100%' style='margin-top:5px' src='${img_url}'><p>`;
              // this.insertImg(img)
              this.editor.execCommand('inserthtml', img)
            }
            this.$toast.clear();
            // let myTextEditor = this.$refs.myTextEditor.quill
            // // 获取光标所在位置
            // let length = myTextEditor.getSelection().index;
            // // 插入图片，res为服务器返回的图片链接地址
            // myTextEditor.insertEmbed(length, 'image', img_url)
            // // 调整光标到最后
            // myTextEditor.setSelection(length + 1)
          } else if (file.type.split('/')[0] == 'video') {
            this.$toast.clear();
            this.videoUrl = img_url;
          }

          // console.log(img_url)
        } else {
          // this.$util.message("err", res.message);
        }
      })

    },
    // 获取词条分类
    getEntryClassification() {
      api.postEntryClassification(this.qs.stringify()).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          // console.log(res.data.type_list)
          this.entry_Classification = res.data.type_list
          if (this.entry_Classification.length > 0) {
            for (let i = 0; i < this.entry_Classification.length; i++) {
              this.entryClassification.push({
                id: this.entry_Classification[i].id,
                muse_id: this.entry_Classification[i].muse_id,
                position: this.entry_Classification[i].position,
                sort: this.entry_Classification[i].sort,
                top_id: this.entry_Classification[i].top_id,
                text: this.entry_Classification[i].type_name,
              })
              if (this.entry_Classification[i].id == this.entrySelectData_id) {
                this.entryClassificationValue = this.entry_Classification[i].type_name
              }
            }
          }
        } else if (res.status === 401) {

        }
      });
    },
    // 获取数据
    getdata() {
      // console.log(1)
      let data = {
        relics_id: this.id,
      }
      // console.log(this.relics_id !== undefined)
      if (this.relics_id !== undefined) {
        api.postEntryDetails(this.qs.stringify(data)).then((res) => {
          // console.log(res)
          if (res.status == 200) {
            // console.log(res.data.info)
            this.entrySelectData_id = res.data.info.type_id;
            this.editor_data = res.data.info;
            // this.fileList[0].content = this.editor_data.image
            if (this.editor_data.image) {
              this.fileList.push({
                url: this.editor_data.image
              })
            }
            if (this.editor_data.content !== '') {
              this.content = this.editor_data.content;
            }
            this.name = this.editor_data.name;
            this.entrySelectData = this.editor_data.related_list;
          } else if (res.status === 401) {
            this.$router.push({
              path: '/toke',
            });
          }
        });
      }
    },
    // 修改提交数据
    postmodifyEntryDetails(index) {
      let relateds = [];
      for (let i = 0; i < this.entrySelectData.length; i++) {
        relateds.push(this.entrySelectData[i].id)
      }
      let data = {
        id: this.id,
        name: this.name,
        image: '',
        voice_url: '',
        video_url: '',
        content: this.content,
        related_ids: relateds.toString(),
        type_id: this.entrySelectData_id,
      }
      if (this.fileList.length > 0) {
        data.image = this.fileList[0].url
      }
      // console.log(this.id)
      // console.log(this.id !== undefined)
      if (this.id !== undefined) {
        api.modifyEntryDetails(this.qs.stringify(data)).then((res) => {
          // console.log(res)
          if (res.status == 200) {
            // console.log(res)
            this.$toast.success(res.message);
            // this.getdata();
            // this.cover_show=false;
            if (index === 1) {
              this.$router.back()
            } else {
              this.jumpRoute('/entryinfo', { id: this.editor_data.id });
            }
          }
        });
      } else {
        api.addCreate(this.qs.stringify(data)).then((res) => {
          // console.log(res)
          if (res.status == 200) {
            // console.log(res)
            this.$toast.success(res.message);
            this.cover_show = false;
            // this.getdata();
            if (index === 1) {
              this.$router.back()
            } else {
              this.jumpRoute('/entryinfo', { id: res.data.id });
            }
          }
        });
      }
    },
    //保存并预览
    savePreview(index) {
      this.postmodifyEntryDetails(index);
    },
    toolbarShow() {
      if (this.edit_show) {
        this.edit_show = false;
        document.querySelector('.Upload-link').setAttribute('style', 'display:none')
      } else {
        this.edit_show = true;
        document.querySelector('.Upload-link').setAttribute('style', 'display:none')
      }
    },
    //相关搜索添加
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //删除数据
    delrelevant(e) {
      let index = (e.target.dataset.index)
      this.entrySelectData.splice(index, 1)
    },
    // 添加数据到相关搜索
    addarr() {
      this.entrySelectData = this.entrySelectData.concat(this.result);
      this.entrySelectData = this.unique(this.entrySelectData);
      this.show = false;
    },
    //数组去重
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    },

    imgPreview(file) {
      let self = this
      let Orientation
      //去获取拍照时的信息，解决拍出来的照片旋转问题   npm install exif-js --save   这里需要安装一下包
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          //判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            // 上传图片
            self.postImg(this.result);
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              // 上传图片
              self.postImg(data);
            }
          }
        }
      }
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      //瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length;
      let width = img.width
      let height = img.height
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //    铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      //如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != '' && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3: //需要180度旋转
            this.rotateImg(img, 'right', canvas) //转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      console.log(ndata)
      return ndata
    },
    // 旋转图片
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0
      const max_step = 3
      if (img == null) return
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = min_step
      }
      if (direction == 'right') {
        step++
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step)
      } else {
        step--
        step < min_step && (step = max_step)
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    //将base64转换为文件
    dataURLtoFile(dataurl) {
      var arr = dataurl.split(','),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], this.files.name, {
        type: this.files.type
      })
    },
    // 提交图片到后端
    async postImg(base64) {
      let file = this.dataURLtoFile(base64)
      let formData = new window.FormData()
      formData.append('file', file);
      // 提交图片
      // Some code
      // this.fileChange(file)
      // console.log(file)
      // console.log(formData,'2')
      this.getpolicy(file);
    },
  },
  watch: {
    // 监听prop的变化，更新ckeditor中的值
    content: function () {
      let ueEl = this.$refs.us;
      this.fram = ueEl
        .querySelector(".edui-editor-iframeholder")
        .querySelector("iframe").contentWindow;
      // 获取编辑器dom元素;
      let ifm = ueEl
        .querySelector(".edui-editor-iframeholder")
        .querySelector("iframe").contentWindow.document.body;
      ifm.addEventListener("click", this.updateOrDelete);
      ifm.addEventListener("keydown", this.upkeydown);
      this.$emit("input", this.content);

      // console.log(ifm)

    },
    // mobHtml: function (val) {
    //   this.editor.execCommand("inserthtml", val);
    // },
    edit_show: function () {
      if (this.edit_show) {
        document.activeElement.blur();
      }
    },
    nowPhoneHeight: function () {
      if (this.defaultPhoneHeight != this.nowPhoneHeight) {
        //手机键盘被唤起了。
        this.edit_show = false;
        // document.querySelector('.Upload-video').setAttribute('style','display:none');
        // document.querySelector('.Upload-link').setAttribute('style','display:none');
      } else {
        //手机键盘被关闭了。
      }
    },
    editor_data: function () {
      if (this.entry_Classification.length > 0) {
        for (let i = 0; i < this.entry_Classification.length; i++) {
          if (this.entry_Classification[i].id == this.entrySelectData_id) {
            this.entryClassificationValue = this.entry_Classification[i].type_name
          }
        }
      }
    },

  },
};
