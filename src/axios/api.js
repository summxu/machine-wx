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

// 获取设备详情
export function deviceInfo (params) {
  return request({
    url: "/admin/machine/device/info",
    method: "GET",
    params
  });
}

// 修改设备信息
export function deviceUpdate (data) {
  return request({
    url: "/admin/machine/device/update",
    method: "POST",
    data
  });
}

// 新增设备信息
export function deviceAdd (data) {
  return request({
    url: "/admin/machine/device/add",
    method: "POST",
    data
  });
}

// 新增设备信息
export function deviceDel (data) {
  return request({
    url: "/admin/machine/device/delete",
    method: "POST",
    data
  });
}

// 用户列表
export function userList (data) {
  return request({
    url: "/admin/base/sys/user/list",
    method: "POST",
    data
  });
}