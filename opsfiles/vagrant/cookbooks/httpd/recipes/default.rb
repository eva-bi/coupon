%w{httpd}.each do |name|
  package name do
    action :install
  end
end

# template "/etc/httpd/conf/httpd.conf" do
#  source "httpd.conf.erb"
# end

execute "set httpd auto start" do
  user "root"
  command <<-EOL
    sudo systemctl enable httpd.service
    service httpd start
  EOL
end
