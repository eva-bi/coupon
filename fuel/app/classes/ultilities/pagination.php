<?php

namespace Ultilities;

class Pagination extends \Pagination
{
    public static $config_default = [
            'show_first' => true,
            'show_last' => true,
    ];
    
    public static function forge($name = 'default', $config = array())
    {
        // Extend config
        $config = array_merge($config, static::$config_default);
        
        return parent::forge($name, $config);
    }
    
    public function first($marker = null)
    {
        $html = '';
        
        $marker === null and $marker = $this->template['first-marker'];
        
        if ($this->config['show_first']) {
            if ((int) $this->config['total_pages'] == (int) $this->config['calculated_page']) {
                $html = str_replace(
                    '{link}',
                    str_replace(array('{uri}', '{page}'), array($this->_make_link(1), $marker), $this->template['first-link']),
                    $this->template['first']
                );
                $this->raw_results['first'] = array('uri' => $this->_make_link(1), 'title' => $marker, 'type' => 'first');
            }
        }
        
        return $html;
    }
    
    public function last($marker = null)
    {
        $html = '';
        
        $marker === null and $marker = $this->template['last-marker'];
        
        if ($this->config['show_last']) {
            if ((int) $this->config['calculated_page'] == 1) {
                $html = str_replace(
                    '{link}',
                    str_replace(array('{uri}', '{page}'), array($this->_make_link($this->config['total_pages']), $marker), $this->template['last-link']),
                    $this->template['last']
                );
                $this->raw_results['last'] = array('uri' => $this->_make_link($this->config['total_pages']), 'title' => $marker, 'type' => 'last');
            }
        }
    
        return $html;
    }
}
