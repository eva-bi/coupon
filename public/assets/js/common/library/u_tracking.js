function set_user_tracking_seed(uid)
{
	var expire_days = (365 * 2);
	var expire_date = new Date();
	var domain      = ".aucfan.com"
	expire_date.setTime( expire_date.getTime() + 1000 * 3600 * (24 * expire_days) );

	if(!isNaN(uid)){
		var c_uid = get_cookie('uid');
		if(false == c_uid || c_uid != uid) {
			document.cookie = 'uid=' + encodeURIComponent(uid) + '; path=/; domain='+domain+'; expires=' + expire_date.toUTCString();
		}
	}

	// create random strings
	var random = Math.floor(Math.random() * 1000);
	var date   = new Date();
	var time   = date.getTime();
	var utcid  = random + '' + time.toString();

	// cookie id long term
	if(false == get_cookie('utcid_long')) {
		document.cookie = 'utcid_long=' + encodeURIComponent(utcid) + '; path=/;  domain='+domain+'; expires=' + expire_date.toUTCString();
	}

	// cookie id until close browser
	if(false == get_cookie('utcid')) {
		document.cookie = 'utcid=' + encodeURIComponent(utcid) + '; path=/; domain='+domain+';';
	}

	return get_user_tracking_seed(uid);
}
function get_user_tracking_seed(uid)
{
	return 'uid='+get_cookie('uid')+'&utcid_long='+get_cookie('utcid_long')+'&utcid='+get_cookie('utcid');
}
function get_cookie(key)
{
	var result = false;
	if(key == null) { return result; }

	var cookieName = key+'=';
	var allcookies = document.cookie;

	var position   = allcookies.indexOf( cookieName );
	if(position != -1) {
		var startIndex = position + cookieName.length;

		var endIndex = allcookies.indexOf( ';', startIndex );
        if( endIndex == -1 ){
			endIndex = allcookies.length;
		}

		result = decodeURIComponent(
			allcookies.substring( startIndex, endIndex ) );
	}

	return result;
}
