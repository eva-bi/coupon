#
# Cookbook Name:: php
# Recipe:: default
#
# Copyright 2015, Aucfan Co., Ltd.
#
# All rights reserved - Do Not Redistribute
#

execute "remove php packages" do
  user "root"
  command <<-EOL
    yum -y erase php54-*
    yum -y erase php55u-*
    yum -y erase php-*
  EOL
end

execute "install php56-remi" do
  user "root"
  command <<-EOL
    yum -y install --enablerepo=remi,remi-php56 \
    php \
    php-devel \
    php-gd \
    php-intl \
    php-mbstring \
    php-mcrypt \
    php-mysqlnd \
    php-opcache \
    php-pdo \
    php-pecl-apcu \
    php-pecl-xdebug \
    php-pear \
    php-xml
  EOL
end
