
# Nginx 配置

```
#user  nobody;
worker_processes  1;

access_log  logs/nginx.access;
error_log logs/nginx.error;

pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {

  include       mime.types;
  default_type  application/octet-stream;

  access_log  logs/http.access;
  error_log logs/http.error;

  sendfile        on;

  keepalive_timeout  65;

  gzip  on;

  # 允许 LUA 读取请求报文体
  lua_need_request_body on;

  underscores_in_headers on;

  # 设置解析 DNS，避免代理访问失败
  resolver 119.29.29.29 ipv6=off;

  server {
      listen       80;
      server_name  localhost;

      charset utf-8;

      access_log  logs/80.access.log;
      error_log  logs/80.error.log;

      location / {
        root   html;
        index  index.html index.htm;
      }

      #error_page  404              /404.html;

      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   html;
      }
  }

  # 日志打印
  log_format main escape=json '{ "time_local": "$time_local", '
                       '"remote_addr": "$remote_addr",'
                       '"costime": "$request_time",'
                       '"realtime": "$upstream_response_time",'
                       '"status": $status,'
                       '"x_forwarded": "$http_x_forwarded_for",'
                       '"referer": "$http_referer",'
                       '"request": "$request",'
                       '"upstr_addr": "$upstream_addr",'
                       '"bytes":$body_bytes_sent,'
                       '"dm":$request_body,'
                       '"agent": "$http_user_agent" }';


  server {
    listen       404;
    server_name  localhost;

    charset utf-8;

    # 应用自定义日志格式
    access_log  logs/404.access.log main;
    error_log  logs/404.error.log;

    location / {
      add_header Access-Control-Allow-Origin *;
      add_header Access-Control-Allow-Methods *;
      add_header Access-Control-Allow-Headers *;
      add_header Content-Type 'application/json; charset=utf-8';

      if ($request_method = 'OPTIONS') {
        return 204;
      }

      # 以 lua 的方式发报文的原因：
      # 1、可以根据请求报文对代理的链接、数据进行修改；
      # 2、后台返回 403 等错误码时，能够添加跨域头，直接使用 proxy_pass 无法操作返回报文头
      rewrite_by_lua_block {

        local res = ngx.location.capture(
          '/internal-proxy'
          ,{
            body = ngx.req.get_body_data()
          }
        )

        -- 遍历报文头
        -- local headers = ngx.req.get_headers();
        -- for k, v in pairs(headers) do
        --     ngx.say(k.."= "..v)
        -- end

        -- 返回报文头
        -- ngx.say(ngx.var.request_method)
        -- ngx.say(ngx.var.http_proxyurl)

        -- 返回报文体
        -- ngx.say(ngx.req.get_body_data())

        -- 返回通讯报文
        ngx.say(res.body)
      }
    }

    location /internal-proxy {
      internal;

      proxy_method $request_method;
      proxy_pass $http_proxyurl;
    }
  }
}

```
