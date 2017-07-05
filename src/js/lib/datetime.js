import Xselect from './select.js';
class Datetime{
	constructor(opts){
		let _this = this;
		_this.def = {
			el:'',
			beginyear: 1980, //日期--年--份开始
			endyear: new Date().getFullYear() + 20, //日期--年--份结束
			beginmonth: 1, //日期--月--份结束
			endmonth: 12, //日期--月--份结束
			beginday: 1, //日期--日--份结束
			endday: 31, //日期--日--份结束
			curdate: true, //打开日期是否定位到当前日期
			moveRes:false,
			moveCallbackF:function(data){
				_this.moveCallback(data);
			},
			moveCallbackS:function(data){
				_this.moveCallback(data);
			},
			callback:function(fdata,sdata,tdata){
				$(_this._opts.el).val(fdata.text+'-'+sdata.text+'-'+tdata.text);
				_this.Xselect.close();
			}
		};
		_this._opts = $.extend({},this.def, opts);
		let datas = _this.datas();
		_this._opts = $.extend({},datas, _this._opts);
		_this.init();
	}
	
	init(){
		let _this = this;
		_this.Xselect = new Xselect(_this._opts);
	}
	
	moveCallback(data){
		let _this = this;
		let indexNum = _this.Xselect._opts.indexNum;
		let fdata = _this.Xselect._opts.data;
		let sdata = _this.Xselect.sdata;
		let endDay = _this.checkdays(fdata[indexNum[0]].id,sdata[indexNum[1]].id);
		if(endDay==_this._opts.endday){
			return false;
		}else if(endDay>(_this.Xselect._opts.indexNum[2]+1)){
			let daydatas = _this.daydata(fdata[indexNum[0]].id,sdata[indexNum[1]].id);
			_this.Xselect.changeTstr(daydatas);
		}else{
			let daydatas = _this.daydata(fdata[indexNum[0]].id,sdata[indexNum[1]].id);
			_this.Xselect.moveyT = -data.liheight*(daydatas.length-1);
			_this.Xselect.changeTstr(daydatas);
			_this.Xselect._opts.indexNum[2]=endDay-1;
		}
		_this.endDate = endDay;
	}
	datas(){
		let _this = this;
		let date = new Date();
		let nowyear = date.getFullYear(),
			nowmonth = date.getMonth()+1,
			nowday = date.getDate();
		let indexNum = $(_this._opts.el).attr('indexNum');
		let dateval = $(_this._opts.el).val();
		if(indexNum){
			indexNum = indexNum.split(',');
			dateval = dateval.split('-');
			nowyear = parseInt(dateval[0]);
			nowmonth = parseInt(dateval[1]);
			nowday = parseInt(dateval[2]);
		}else{
			indexNum = [0,0,0];
			indexNum[0] = nowyear-(_this._opts.beginyear);
			indexNum[1] = nowmonth-1;
			indexNum[2] = nowday-1;
		}
		let yeardatas = _this.yeardata();
		let monthdatas = _this.monthdata();
		let daydatas = _this.daydata(nowyear,nowmonth);
		return {indexNum:indexNum,data:yeardatas,sdata:monthdatas,tdata:daydatas};
	}
	
	yeardata(){
		let _this = this;
		let data = [];
		for(let i=_this._opts.beginyear;i<=_this._opts.endyear;i++){
			let yeardata = {};
			yeardata.id=i;
			yeardata.text=i;
			data.push(yeardata);
		}
		
		return data;
	}
	
	monthdata(){
		let _this = this;
		let data = [];
		for(let i=_this._opts.beginmonth;i<=_this._opts.endmonth;i++){
			let monthdata = {};
			if(i<10){
				monthdata.id='0'+i;
				monthdata.text='0'+i;
			}else{
				monthdata.id=i;
				monthdata.text=i;
			}

			data.push(monthdata);
		}
		return data;
	}
	
	daydata(year, month){
		let _this = this;
		let data = [];
		_this._opts.endday = _this.checkdays(year, month);
		for(let i=_this._opts.beginday;i<=_this._opts.endday;i++){
			let daydata = {};
			if(i<10){
				daydata.id='0'+i;
				daydata.text='0'+i;
			}else{
				daydata.id=i;
				daydata.text=i;
			} 
			data.push(daydata)
		}
		return data;
	}
	
	checkdays(year, month) {
		year = parseInt(year);
		month = parseInt(month);
		let new_year = year; //取当前的年份        
		let new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）        
		if(month > 12) //如果当前大于12月，则年份转到下一年        
		{
			new_month -= 12; //月份减        
			new_year++; //年份增        
		}
		let new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天        
		return(new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月最后一天日期    
	}
}

export default Datetime;