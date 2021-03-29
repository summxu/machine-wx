/*
 * @Author: Xuxu
 * @Date: 2020-09-29 18:45:43
 * @LastEditTime: 2020-09-29 18:45:58
 * @Msg: Nothing
 */
export function dataURLtoBlob (dataURI, type) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: type });
}
