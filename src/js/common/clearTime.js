export default{
	clearTime(){
		let timeData = window.timeData;
		if(!timeData){
			timeData=[];
		}
		for(let i=0;i<timeData.length;i++){
			clearInterval(timeData[i]);
		}
		window.timeData = [];
	}

}