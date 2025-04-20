import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { type City } from '~/types/city';
import { ApiCities } from '~/services/apiCities';
import type { FilterParams } from '~/types/city';


export const useCitiesStore = defineStore('cities', () => {
  const apiService = new ApiCities();
  const isLoading = ref<boolean>(false);
	const noResults = ref(false);
	const view = ref<'Column' | 'Grid'>('Column');

  const cities = reactive<City[]>([]);
  const filteredCities = reactive<City[]>([]);

	// const testCities = reactive<City[]>([
  //   {"id":3350606,"wikiDataId":"Q24668","type":"CITY","city":"Aixirivall","name":"Aixirivall","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.46245,"longitude":1.50209,"population":1025},{"id":3216144,"wikiDataId":"Q24656","type":"CITY","city":"Aixovall","name":"Aixovall","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.47635833,"longitude":1.48949167,"population":69},{"id":3341362,"wikiDataId":"Q24551","type":"CITY","city":"Anyós","name":"Anyós","country":"Andorra","countryCode":"AD","region":"La Massana","regionCode":"04","regionWdId":"Q24276","latitude":42.53459167,"longitude":1.54165,"population":1006},{"id":866,"wikiDataId":"Q24554","type":"CITY","city":"Arinsal","name":"Arinsal","country":"Andorra","countryCode":"AD","region":"La Massana","regionCode":"04","regionWdId":"Q24276","latitude":42.56666667,"longitude":1.48333333,"population":1419},{"id":3851202,"wikiDataId":"Q24379","type":"CITY","city":"El Forn","name":"El Forn","country":"Andorra","countryCode":"AD","region":"Canillo","regionCode":"02","regionWdId":"Q24260","latitude":42.53333333,"longitude":1.56666667,"population":99},{"id":408,"wikiDataId":"Q24456","type":"CITY","city":"El Pas de la Casa","name":"El Pas de la Casa","country":"Andorra","countryCode":"AD","region":"Encamp","regionCode":"03","regionWdId":"Q24269","latitude":42.54277,"longitude":1.73361,"population":1927},{"id":614,"wikiDataId":"Q24413","type":"CITY","city":"El Tarter","name":"El Tarter","country":"Andorra","countryCode":"AD","region":"Canillo","regionCode":"02","regionWdId":"Q24260","latitude":42.58333333,"longitude":1.65,"population":747},{"id":3489827,"wikiDataId":"Q24417","type":"CITY","city":"Els Plans","name":"Els Plans","country":"Andorra","countryCode":"AD","region":"Canillo","regionCode":"02","regionWdId":"Q24260","latitude":42.580603,"longitude":1.635486,"population":38},{"id":3482283,"wikiDataId":"Q24629","type":"CITY","city":"Fontaneda","name":"Fontaneda","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.4539,"longitude":1.4575,"population":110},{"id":3228107,"wikiDataId":"Q24388","type":"CITY","city":"Incles","name":"Incles","country":"Andorra","countryCode":"AD","region":"Canillo","regionCode":"02","regionWdId":"Q24260","latitude":42.583,"longitude":1.662,"population":510},{"id":2987553,"wikiDataId":"Q24371","type":"CITY","city":"L'Aldosa de Canillo","name":"L'Aldosa de Canillo","country":"Andorra","countryCode":"AD","region":"Canillo","regionCode":"02","regionWdId":"Q24260","latitude":42.57777778,"longitude":1.61944444,"population":289},{"id":3467153,"wikiDataId":"Q24540","type":"CITY","city":"L'Aldosa de la Massana","name":"L'Aldosa de la Massana","country":"Andorra","countryCode":"AD","region":"La Massana","regionCode":"04","regionWdId":"Q24276","latitude":42.54391,"longitude":1.52289,"population":594},{"id":3086756,"wikiDataId":"Q24486","type":"CITY","city":"La Cortinada","name":"La Cortinada","country":"Andorra","countryCode":"AD","region":"Ordino","regionCode":"05","regionWdId":"Q24272","latitude":42.57667,"longitude":1.51773,"population":845},{"id":3056764,"wikiDataId":"Q2536296","type":"CITY","city":"La Margineda","name":"La Margineda","country":"Andorra","countryCode":"AD","region":"Andorra la Vella","regionCode":"07","regionWdId":"Q2522163","latitude":42.4859,"longitude":1.49045,"population":155},{"id":759,"wikiDataId":"Q1050185","type":"CITY","city":"Les Escaldes","name":"Les Escaldes","country":"Andorra","countryCode":"AD","region":"Escaldes-Engordany","regionCode":"08","regionWdId":"Q24286","latitude":42.5,"longitude":1.53333333,"population":15853},{"id":3299914,"wikiDataId":"Q24622","type":"CITY","city":"Llumeneres","name":"Llumeneres","country":"Andorra","countryCode":"AD","region":"Sant Julià de Lòria","regionCode":"06","regionWdId":"Q24282","latitude":42.4725,"longitude":1.51111111,"population":5},{"id":3280253,"wikiDataId":"Q24390","type":"CITY","city":"Meritxell","name":"Meritxell","country":"Andorra","countryCode":"AD","region":"Canillo","regionCode":"02","regionWdId":"Q24260","latitude":42.55416667,"longitude":1.59055556,"population":69},{"id":3300956,"wikiDataId":"Q24558","type":"CITY","city":"Pal","name":"Pal","country":"Andorra","countryCode":"AD","region":"La Massana","regionCode":"04","regionWdId":"Q24276","latitude":42.55,"longitude":1.48333333,"population":235},{"id":3077529,"wikiDataId":"Q24597","type":"CITY","city":"Santa Coloma d'Andorra","name":"Santa Coloma d'Andorra","country":"Andorra","countryCode":"AD","region":"Andorra la Vella","regionCode":"07","regionWdId":"Q2522163","latitude":42.493897222,"longitude":1.497683333,"population":3002},{"id":3437048,"wikiDataId":"Q24562","type":"CITY","city":"Sispony","name":"Sispony","country":"Andorra","countryCode":"AD","region":"La Massana","regionCode":"04","regionWdId":"Q24276","latitude":42.53333333,"longitude":1.51666667,"population":833},{"id":2996424,"wikiDataId":"Q24398","type":"CITY","city":"Soldeu","name":"Soldeu","country":"Andorra","countryCode":"AD","region":"Canillo","regionCode":"02","regionWdId":"Q24260","latitude":42.576944444,"longitude":1.667222222,"population":622},{"id":3205272,"wikiDataId":"Q24459","type":"CITY","city":"Vila","name":"Vila","country":"Andorra","countryCode":"AD","region":"Encamp","regionCode":"03","regionWdId":"Q24269","latitude":42.5319,"longitude":1.5656,"population":1143},{"id":659,"wikiDataId":"Q1519","type":"CITY","city":"Abu Dhabi","name":"Abu Dhabi","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Abu Dhabi","regionCode":"AZ","regionWdId":"Q187712","latitude":24.451111111,"longitude":54.396944444,"population":1483000},{"id":638,"wikiDataId":"Q530171","type":"CITY","city":"Ajman","name":"Ajman","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Ajman","regionCode":"AJ","regionWdId":"Q159477","latitude":25.399444444,"longitude":55.479722222,"population":490035},{"id":644,"wikiDataId":"Q234600","type":"CITY","city":"Al Ain","name":"Al Ain","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Abu Dhabi","regionCode":"AZ","regionWdId":"Q187712","latitude":24.2075,"longitude":55.744722222,"population":766936},{"id":3599334,"wikiDataId":"Q3501086","type":"CITY","city":"Al Garhoud","name":"Al Garhoud","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Dubai","regionCode":"DU","regionWdId":"Q613","latitude":25.228938888,"longitude":55.326630555,"population":19726},{"id":3210694,"wikiDataId":"Q4703966","type":"CITY","city":"Al Hamidiyah","name":"Al Hamidiyah","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Ajman","regionCode":"AJ","regionWdId":"Q159477","latitude":25.391666666,"longitude":55.53,"population":27000},{"id":3355708,"wikiDataId":"Q4703978","type":"CITY","city":"Al Hamriyah","name":"Al Hamriyah","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Sharjah","regionCode":"SH","regionWdId":"Q188810","latitude":25.480833333,"longitude":55.498333333,"population":3297},{"id":3873093,"wikiDataId":"Q130554593","type":"CITY","city":"Al Hiyar","name":"Al Hiyar","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Abu Dhabi","regionCode":"AZ","regionWdId":"Q187712","latitude":24.5888856,"longitude":55.7441575,"population":7610},{"id":3871686,"wikiDataId":"Q55603483","type":"CITY","city":"Al Madam","name":"Al Madam","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Sharjah","regionCode":"SH","regionWdId":"Q188810","latitude":24.96138889,"longitude":55.79027778,"population":11120},{"id":3849162,"wikiDataId":"Q126727648","type":"CITY","city":"Baighit","name":"Baighit","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Ras Al Khaimah","regionCode":"RK","regionWdId":"Q170024","latitude":25.9293803,"longitude":56.1538078,"population":5},{"id":519,"wikiDataId":"Q3492826","type":"CITY","city":"Dhaid","name":"Dhaid","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Sharjah","regionCode":"SH","regionWdId":"Q188810","latitude":25.283333333,"longitude":55.883333333,"population":20165},{"id":3872205,"wikiDataId":"Q3696182","type":"CITY","city":"Dibba Al-Fujairah","name":"Dibba Al-Fujairah","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Fujairah","regionCode":"FU","regionWdId":"Q4091","latitude":25.616667,"longitude":56.266667,"population":41017},{"id":571,"wikiDataId":"Q6742405","type":"CITY","city":"Dibba Al-Hisn","name":"Dibba Al-Hisn","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Sharjah","regionCode":"SH","regionWdId":"Q188810","latitude":25.608888888,"longitude":56.275833333,"population":26395},{"id":3519123,"wikiDataId":"Q612","type":"CITY","city":"Dubai","name":"Dubai","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Dubai","regionCode":"DU","regionWdId":"Q613","latitude":25.269722222,"longitude":55.309444444,"population":3564931},{"id":3671889,"wikiDataId":"Q1262899","type":"ADM2","city":"Dubai Internet City","name":"Dubai Internet City","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Dubai","regionCode":"DU","regionWdId":"Q613","latitude":25.095,"longitude":55.16,"population":24000},{"id":3857682,"wikiDataId":"Q770233","type":"CITY","city":"Hatta","name":"Hatta","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Dubai","regionCode":"DU","regionWdId":"Q613","latitude":24.80073,"longitude":56.12726,"population":15324},{"id":3387938,"wikiDataId":"Q1142971","type":"CITY","city":"Jumeirah","name":"Jumeirah","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Dubai","regionCode":"DU","regionWdId":"Q613","latitude":25.210069444,"longitude":55.248961111,"population":39080},{"id":3872905,"wikiDataId":"Q2204078","type":"CITY","city":"Kalba","name":"Kalba","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Sharjah","regionCode":"SH","regionWdId":"Q188810","latitude":25.0513,"longitude":56.35422,"population":54876},{"id":124,"wikiDataId":"Q764279","type":"CITY","city":"Khor Fakkan","name":"Khor Fakkan","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Sharjah","regionCode":"SH","regionWdId":"Q188810","latitude":25.339166666,"longitude":56.356111111,"population":39151},{"id":3293652,"wikiDataId":"Q1888663","type":"CITY","city":"Manama","name":"Manama","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Ajman","regionCode":"AJ","regionWdId":"Q159477","latitude":25.33,"longitude":56.021944444,"population":5823},{"id":3872548,"wikiDataId":"Q60743083","type":"CITY","city":"Margham","name":"Margham","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Dubai","regionCode":"DU","regionWdId":"Q613","latitude":24.899518,"longitude":55.6254536,"population":930},{"id":3211995,"wikiDataId":"Q3133042","type":"CITY","city":"Masfut","name":"Masfut","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Ajman","regionCode":"AJ","regionWdId":"Q159477","latitude":24.81089,"longitude":56.10657,"population":8988},{"id":300,"wikiDataId":"Q6401643","type":"CITY","city":"Murbah","name":"Murbah","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Sharjah","regionCode":"SH","regionWdId":"Q188810","latitude":25.280555555,"longitude":56.364166666,"population":2000},{"id":3714175,"wikiDataId":"Q117287828","type":"CITY","city":"Musaibat","name":"Musaibat","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Ras Al Khaimah","regionCode":"RK","regionWdId":"Q170024","latitude":25.91432,"longitude":56.15549,"population":2},{"id":879,"wikiDataId":"Q21735810","type":"CITY","city":"Muzayri‘","name":"Muzayri‘","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Abu Dhabi","regionCode":"AZ","regionWdId":"Q187712","latitude":23.143611111,"longitude":53.788055555,"population":10000},{"id":413,"wikiDataId":"Q1023786","type":"CITY","city":"Ruwais","name":"Ruwais","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Abu Dhabi","regionCode":"AZ","regionWdId":"Q187712","latitude":24.11685491,"longitude":52.73301956,"population":25000},{"id":3867373,"wikiDataId":"Q3696195","type":"CITY","city":"Sha'am","name":"Sha'am","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Ras Al Khaimah","regionCode":"RK","regionWdId":"Q170024","latitude":26.024444444,"longitude":56.083888888,"population":1550},{"id":3714609,"wikiDataId":"Q117352121","type":"CITY","city":"Shairi","name":"Shairi","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Ras Al Khaimah","regionCode":"RK","regionWdId":"Q170024","latitude":25.70062,"longitude":56.12278,"population":6},{"id":900,"wikiDataId":"Q289693","type":"CITY","city":"Sharjah","name":"Sharjah","country":"United Arab Emirates","countryCode":"AE","region":"Emirate of Sharjah","regionCode":"SH","regionWdId":"Q188810","latitude":25.3375,"longitude":55.411944444,"population":1247749}
  // ]);

	
  const fetchCities = async () => {
		try {
			isLoading.value = true;

			// delay 5s to display loading
			await new Promise(resolve => setTimeout(resolve, 5000));
			
			const newCities = await apiService.getCities();
			
			cities.push(...newCities);
			filteredCities.push(...newCities)
		} catch (error) {
			console.error('Error fetching cities:', error);
			alert(error);
		} finally {
			isLoading.value = false;
		}
	};

	const fitered = async (params: FilterParams) => {
    try {
      if (!params.country && !params.region && !params.name && !params.population) {
				noResults.value = false
        filteredCities.splice(0, filteredCities.length, ...cities);
        return;
      }

      const filteredData = cities.filter(city => {
        const matchesCountry = params.country
          ? city.country.toLowerCase() === params.country.toLowerCase()
          : true;

        const matchesRegion = params.region
          ? city.region.toLowerCase() === params.region.toLowerCase()
          : true;

        const matchesName = params.name
          ? city.name.toLowerCase().includes(params.name.toLowerCase())
          : true;

        const matchesPopulation = params.population
          ? city.population >= params.population
          : true;

        return matchesCountry && matchesRegion && matchesName && matchesPopulation;
      });

      filteredCities.splice(0, filteredCities.length, ...filteredData);
			if (filteredCities.length == 0) {
				noResults.value = true
			}
    } catch (error) {
      console.error('Error filtering cities:', error);
      alert('Fail filtering cities');
    }
  };

  return { filteredCities, fetchCities, isLoading, fitered, noResults, view };
});
