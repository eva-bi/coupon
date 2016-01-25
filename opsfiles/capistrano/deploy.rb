# config valid only for current version of Capistrano
# lock '3.3.5'

set :tmp_dir, "#{fetch(:home)}/tmp"
set :application, 'mutou'
set :repo_url, 'git@github.com:ashita-teamCo/project-tenryu-v4.git'
set :deploy_to,     '/var/www'
set :linked_dirs,   %w{fuel/app/logs cache/templates_c public/images upload}

set :scm,           :git
set :branch,        'master'
set :format,        :pretty
set :log_level,     :debug
set :pty,           true
set :keep_releases, 5
set :use_sudo,      false


# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('bin', 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do
  Rake::Task["deploy:check:directories"].clear
  namespace :check do
    desc '(overwrite) Setup log directories'
    task :directories do
      on release_roles :all do
        execute :sudo, :mkdir, '-pv', shared_path, releases_path
        execute :sudo, :chown, "#{fetch(:user)}:#{fetch(:group)}", deploy_to
        execute :sudo, :chown, "#{fetch(:user)}:#{fetch(:group)}", shared_path
        execute :sudo, :chown, "#{fetch(:user)}:#{fetch(:group)}", releases_path
      end
    end
    task :update_permissions do
      on release_roles :all do
        execute :sudo, 'find', shared_path, '-type d -exec chmod 777 {} \;'
      end
    end
    after :make_linked_dirs, :update_permissions
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
