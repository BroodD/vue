export
var scroll = {
	data () {
		return {
			scroll: 0
		}
	},
	methods: {
		onScroll(e) {
			var contentHeight = document.querySelector('#my')
			var top = e.target.scrollTop
			if (top > this.scroll && top >= contentHeight.clientHeight - e.target.offsetHeight * 2) {
				this.scroll = top + e.target.offsetHeight * 2
				this.reload()
			}
		}
	}
}


// source https://www.geodatasource.com/developers/javascript
export
var distance = {
	methods: {
		distan (lat1, lon1, lat2, lon2) {
			if ((lat1 == lat2) && (lon1 == lon2)) {
				return 0;
			}
			else {
				var radlat1 = Math.PI * lat1 / 180;
				var radlat2 = Math.PI * lat2 / 180;
				var theta = lon1 - lon2;
				var radtheta = Math.PI * theta / 180;
				var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
				if (dist > 1) {
					dist = 1;
				}
				dist = Math.acos(dist);
				dist = dist * 180 / Math.PI;
				dist = dist * 60 * 1.1515;
				dist = dist * 1.609344;
				dist = dist.toFixed(2) + 'km';
				return dist;
			}
		}
	}
}