(function ($) {
    $.Navigator = function () {

        /* ------------------- *
         * Auxiliary functions *
         * ------------------- */
        function getFirstMatch(regex) {
            var match = ua.match(regex);
            return (match && match.length > 1 && match[1]) || '';
        }

        function getSecondMatch(regex) {
            var match = ua.match(regex);
            return (match && match.length > 1 && match[2]) || '';
        }


        /* --------- *
         * Variables *
         * --------- */
        var ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';

        var iosDevice = /(ipod|iphone|ipad)/i.test(ua);
        var likeAndroid = /like android/i.test(ua);
        var chromeOS = /CrOS/.test(ua);
        var windowsPhone = /windows phone/i.test(ua);
        var silk = /silk/i.test(ua);
        var sailfish = /sailfish/i.test(ua);
        var tizen = /tizen/i.test(ua);
        var webos = /(web|hpw)os/i.test(ua);

        var android = !likeAndroid && /android/i.test(ua);
        var windows = !windowsPhone && /windows/i.test(ua);
        var mac = !iosDevice && !silk && /macintosh/i.test(ua);
        var linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua);
        var tablet = /tablet/i.test(ua);
        var mobile = !tablet && /[^-]mobi/i.test(ua);

        var edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i);
        var versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i);


        /* ---------------- *
         * Get browser info *
         * ---------------- */
        var getInfo = function () {
            var result = {
                name: '',
                version: ''
            };

            if (/opera|opr|opios/i.test(ua)) {
                result.name = 'Opera';
                result.version = versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i);
                result.opera = true;
            } else if (/coast/i.test(ua)) {
                result.name = 'Opera Coast';
                result.version = versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i);
                result.coast = true;
            } else if (/yabrowser/i.test(ua)) {
                result.name = 'Yandex Browser';
                result.version = versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i);
                result.yandex = true;
            } else if (/ucbrowser/i.test(ua)) {
                result.name = 'UC Browser';
                result.version = getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i);
                result.ucBrowser = true;
            } else if (/mxios/i.test(ua)) {
                result.name = 'Maxthon';
                result.version = getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i);
                result.maxthon = true;
            } else if (/epiphany/i.test(ua)) {
                result.name = 'Epiphany';
                result.version = getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i);
                result.epiphany = true;
            } else if (/puffin/i.test(ua)) {
                result.name = 'Puffin';
                result.version = getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i);
                result.puffin = true;
            } else if (/sleipnir/i.test(ua)) {
                result.name = 'Sleipnir';
                result.version = getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i);
                result.sleipnir = true;
            } else if (/k-meleon/i.test(ua)) {
                result.name = 'K-Meleon';
                result.version = getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i);
                result.kMeleon = true;
            } else if (windowsPhone) {
                result.name = 'Windows Phone';
                result.windowsPhone = true;

                if (edgeVersion) {
                    result.edge = true;
                    result.version = edgeVersion;
                } else {
                    result.ie = true;
                    result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
                }
            } else if (/msie|trident/i.test(ua)) {
                result.name = 'Internet Explorer';
                result.version = getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i);
                result.ie = true;
            } else if (chromeOS) {
                result.name = 'Chrome';
                result.version = getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i);
                result.chrome = true;
                result.chromeOS = true;
                result.chromeBook = true;
            } else if (/chrome.+? edge/i.test(ua)) {
                result.name = 'Microsoft Edge';
                result.version = edgeVersion;
                result.edge = true;
            } else if (/vivaldi/i.test(ua)) {
                result.name = 'Vivaldi';
                result.version = getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier;
                result.vivaldi = true;
            } else if (sailfish) {
                result.name = 'Sailfish';
                result.version = getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i);
                result.sailfish = true;
            } else if (/seamonkey\//i.test(ua)) {
                result.name = 'SeaMonkey';
                result.version = getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i);
                result.seaMonkey = true;
            } else if (/firefox|iceweasel|fxios/i.test(ua)) {
                result.name = 'Firefox';
                result.version = getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i);
                result.firefox = true;

                if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                    result.firefoxOS = true;
                }
            } else if (silk) {
                result.name = 'Amazon Silk';
                result.version = getFirstMatch(/silk\/(\d+(\.\d+)?)/i);
                result.silk = true;
            } else if (/phantom/i.test(ua)) {
                result.name = 'PhantomJS';
                result.version = getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i);
                result.phantom = true;
            } else if (/slimerjs/i.test(ua)) {
                result.name = 'SlimerJS';
                result.version = getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i);
                result.slimer = true;
            } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
                result.name = 'BlackBerry';
                result.version = versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i);
                result.blackBerry = true;
            } else if (webos) {
                result.name = 'WebOS';
                result.version = versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i);
                result.webOS = true;

                if (/touchpad\//i.test(ua)) {
                    result.touchpad = true;
                }
            } else if (/bada/i.test(ua)) {
                result.name = 'Bada';
                result.version = getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i);
                result.bada = true;
            } else if (tizen) {
                result.name = 'Tizen';
                result.version = getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier;
                result.tizen = true;
            } else if (/qupzilla/i.test(ua)) {
                result.name = 'QupZilla';
                result.version = getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier;
                result.qupZilla = true;
            } else if (/chromium/i.test(ua)) {
                result.name = 'Chromium';
                result.version = getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier;
                result.chromium = true;
            } else if (/chrome|crios|crmo/i.test(ua)) {
                result.name = 'Chrome';
                result.version = getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i);
                result.chrome = true;
            } else if (android) {
                result.name = 'Android';
                result.version = versionIdentifier;
                result.android = true;
            } else if (/safari|applewebkit/i.test(ua)) {
                result.name = 'Safari';
                result.version = versionIdentifier;
                result.safari = true;
            } else if (iosDevice) {
                if (iosDevice === 'iphone') {
                    result.name = 'iPhone';
                    result.iphone = true;
                } else {
                    if (iosDevice === 'ipad') {
                        result.name = 'iPad';
                        result.ipad = true;
                    } else {
                        result.name = 'iPod';
                        result.ipod = true;
                    }
                }

                result.version = versionIdentifier;
            } else if (/googlebot/i.test(ua)) {
                result.name = 'Googlebot';
                result.version = getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier;
                result.googlebot = true;
            } else {
                result.name = getFirstMatch(/^(.*)\/(.*) /);
                result.version = getSecondMatch(/^(.*)\/(.*) /);
            }

            return result;
        };


        /* -------------------- *
         * Test browser version *
         * -------------------- */
        var test = function (options) {
            options || {};

            var defaults = {
                ie: 9,
                firefox: 35,
                chrome: 27,
                opera: 27,
                safari: 6
            };

            $.extend(defaults, options);
            
            var info = getInfo();
            var result = true;
            
            $.each(defaults, function(nav, version) {
                var isCurrentNav = typeof info[nav] !== typeof undefined;
                var isntSupported = parseFloat(info.version) < version;

                if(isCurrentNav && isntSupported) {
                    result = false;
                }
            });
            
            return result;
        };


        return {
            isAndroid: function () {
                return android;
            },
            isWindows: function () {
                return windows;
            },
            isMac: function () {
                return mac;
            },
            isLinux: function () {
                return linux;
            },
            isTablet: function () {
                return tablet;
            },
            isMobile: function () {
                return mobile;
            },
            isChrome: function () {
                return typeof getInfo.chrome !== typeof undefined;
            },
            isFirefox: function () {
                return typeof getInfo.firefox !== typeof undefined;
            },
            isSafari: function () {
                return typeof getInfo.safari !== typeof undefined;
            },
            isOpera: function () {
                return typeof getInfo.opera !== typeof undefined;
            },
            isIE: function () {
                return typeof getInfo.ie !== typeof undefined;
            },
            isEdge: function () {
                return typeof getInfo.edge !== typeof undefined;
            },
            getInfo: getInfo,
            test: test
        };
        
    };
}(jQuery));