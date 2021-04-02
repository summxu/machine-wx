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

// 删除设备信息
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

// 用户列表（分页）
export function userPage (data) {
  return request({
    url: "/admin/base/sys/user/page",
    method: "POST",
    data
  });
}


// 获取用户详情
export function userInfo (params) {
  return request({
    url: "/admin/base/sys/user/info",
    method: "GET",
    params
  });
}

// 修改用户信息
export function userUpdate (data) {
  return request({
    url: "/admin/base/sys/user/update",
    method: "POST",
    data
  });
}

// 新增用户信息
export function userAdd (data) {
  return request({
    url: "/admin/base/sys/user/add",
    method: "POST",
    data
  });
}

// 删除用户信息
export function userDel (data) {
  return request({
    url: "/admin/base/sys/user/delete",
    method: "POST",
    data
  });
}

// 角色列表
export function roleList (data) {
  return request({
    url: "/admin/base/sys/role/list",
    method: "POST",
    data
  });
}

// 工单列表
export function workOrderPage (data) {
  return request({
    url: "/admin/machine/workorder/page",
    method: "POST",
    data
  });
}

// 工单详情
export function workOrderInfo (params) {
  return request({
    url: "/admin/machine/workorder/info",
    method: "GET",
    params
  });
}

// 工单列表
export function workOrderUpdate (data) {
  return request({
    url: "/admin/machine/workorder/update",
    method: "POST",
    data
  });
}