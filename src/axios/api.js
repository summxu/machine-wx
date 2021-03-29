/*
 * @Author: Chenxu
 * @Date: 2019-07-04 17:00:12
 * @Last Modified by: Chenxu
 * @Last Modified time: 2019-12-03 13:34:17
 */
import request from "@/axios/request";

export function login (data) {
  return request({
    url: "/admin/base/open/login",
    method: "POST",
    data
  });
}

// 获取个人信息
export function person (params) {
  return request({
    url: "/admin/base/comm/person",
    method: "GET",
    params
  });
}

// 获取设备列表
export function devicePage (data) {
  return request({
    url: "/admin/machine/device/page",
    method: "POST",
    data
  });
}