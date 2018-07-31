
	var company = {
		name : 'airbnb.com'
	};

	var zenCard;

	try {
		var pwSdkObj = PWSDK.init();
	} catch(err) {
		console.log(err);	
	}

	$(function() {
		
		if (pwSdkObj) {
			pwSdkObj.setAppUI({height: 300});
			pwSdkObj.getContext().then(function(data) {
				if(data.context.entity_type == 19) {
					company.name = data.context.email_domain;
					fetchCrunchbaseCompany(company);
				}
				console.log('CONTEXT OBJECT:' + data.context);
			});
		}

		crunchBaseInfo = new Vue({
			el: '#crunchBaseInfo',
			data: {
			user: '',
			items: [],
			status: 'new',
			newTicketUrl: 'https://d3v-prosperworksdev.zendesk.com/hc/en-us/requests/new'
			}
		})

		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		function fetchCrunchbaseCompany(company){
			$.ajax({
			type: 'GET',
			dataType: 'json',
			data: company,
			url: '/cbinfo',
			success: function(result) {
				console.log(result);
				if(result.data.items) {
					var props = result.data.items[0].properties;
					crunchBaseInfo.status = 'success';
					crunchBaseInfo.items = [];
					crunchBaseInfo.items.push({
						api_path : props.api_path,
						api_url : props.api_url, 
						city_name : props.city_name, 
						country_code : props.country_code, 
						created_at : props.created_at,
						domain : props.domain,
						facebook_url : props.facebook_url,
						homepage_url : props.homepage_url,
						url : props.url,
						linkedin_url : props.linkedin_url,
						name : props.name,
						permalink : props.permalink,
						primary_role : props.primary_role,
						profile_image_url : props.profile_image_url,
						region_name : props.region_name,
						short_description : props.short_description,
						stock_exchange : props.stock_exchange,
						stock_symbol : props.stock_symbol,
						twitter_url : props.twitter_url,
						updated_at : props.updated_at,
						web_path : props.web_path
					});
				}
					if (pwSdkObj) { pwSdkObj.setAppUI({ count: crunchBaseInfo.items.length }); }


			
			},

			error: function(result) {
				console.log(result);
				crunchBaseInfo.status = 'error';
			}

			});
		}

		//$("button").on("click", fetchZendeskTicketsByEmail(person.email));

		if (!pwSdkObj) {
			console.log('no context object...fetching company for default email:' + company.name)
			fetchCrunchbaseCompany(company);
		}

	});