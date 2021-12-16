import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  User:string|null=""
  Userfm:any
  public data:any=[]
  public data2:any=[]
  public data3:any=[]
  public data4:any=[]
  public data5:any=[]
  public data6:any=[]
  public data7:any=[]
  public data8:any=[]

  album1:any
  album2:any
  album3:any
  album4:any
  album5:any
  album6:any
  album7:any
  album8:any
  album9:any
  album10:any

  song1:any
  song2:any
  song3:any
  song4:any
  song5:any
  song6:any
  song7:any
  song8:any
  song9:any
  song10:any
  song11:any
  song12:any
  song13:any
  song14:any
  song15:any
  song16:any
  song17:any
  song18:any
  song19:any
  song20:any

  respuesta:any

  #text:any='#text'
  constructor(private route:ActivatedRoute,private http: HttpClient) { 
    this.data=[]
    this.data2=[]
    this.data3=[]
    this.data4=[]
    this.data5=[]
    this.data6=[]
    this.data7=[]
    this.data8=[]
    this.User=this.route.snapshot.paramMap.get('user')
    
    const url9='http://25.83.103.75:5000/fm/'+this.User
    this.http.get(url9).subscribe((res)=>{
      console.log(res)
      this.respuesta=res
      this.Userfm=this.respuesta["0"]["usuariofm"]
      console.log(this.Userfm)
      if(this.Userfm!="null" && this.Userfm!=null)
      {
        console.log("entro")
      const url='http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user='+this.Userfm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
      const url2='http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user='+this.Userfm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
      const url3='http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user='+this.Userfm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
      const url4='http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user='+this.Userfm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
      const url5='http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+this.Userfm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
      const url6='http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user='+this.Userfm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
      const url7='http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+this.Userfm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
      const url8='http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user='+this.Userfm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
      this.http.get(url).subscribe((res)=>{
        this.data=res
      })
      this.http.get(url2).subscribe((res)=>{
        this.data2=res
      })
      this.http.get(url3).subscribe((res)=>{
        this.data3=res
      })
      this.http.get(url4).subscribe((res)=>{
        this.data4=res
      })
      this.http.get(url5).subscribe((res)=>{
        this.data5=res
      })
      this.http.get(url6).subscribe((res)=>{
        this.data6=res
        console.log(this.data6)
        this.album1=this.data6["topalbums"]["album"]["0"]["image"]["3"]["#text"]
        this.album2=this.data6["topalbums"]["album"]["1"]["image"]["3"]["#text"]
        this.album3=this.data6["topalbums"]["album"]["2"]["image"]["3"]["#text"]
        this.album4=this.data6["topalbums"]["album"]["3"]["image"]["3"]["#text"]
        this.album5=this.data6["topalbums"]["album"]["4"]["image"]["3"]["#text"]
        this.album6=this.data6["topalbums"]["album"]["5"]["image"]["3"]["#text"]
        this.album7=this.data6["topalbums"]["album"]["6"]["image"]["3"]["#text"]
        this.album8=this.data6["topalbums"]["album"]["7"]["image"]["3"]["#text"]
        this.album9=this.data6["topalbums"]["album"]["8"]["image"]["3"]["#text"]
        this.album10=this.data6["topalbums"]["album"]["9"]["image"]["3"]["#text"]
      })
      this.http.get(url7).subscribe((res)=>{
        this.data7=res
        this.song1=this.data7["recenttracks"]["track"]["0"]["image"]["3"]["#text"]
        this.song2=this.data7["recenttracks"]["track"]["1"]["image"]["3"]["#text"]
        this.song3=this.data7["recenttracks"]["track"]["2"]["image"]["3"]["#text"]
        this.song4=this.data7["recenttracks"]["track"]["3"]["image"]["3"]["#text"]
        this.song5=this.data7["recenttracks"]["track"]["4"]["image"]["3"]["#text"]
        this.song6=this.data7["recenttracks"]["track"]["5"]["image"]["3"]["#text"]
        this.song7=this.data7["recenttracks"]["track"]["6"]["image"]["3"]["#text"]
        this.song8=this.data7["recenttracks"]["track"]["7"]["image"]["3"]["#text"]
        this.song9=this.data7["recenttracks"]["track"]["8"]["image"]["3"]["#text"]
        this.song10=this.data7["recenttracks"]["track"]["9"]["image"]["3"]["#text"]
        this.song11=this.data7["recenttracks"]["track"]["10"]["image"]["3"]["#text"]
        this.song12=this.data7["recenttracks"]["track"]["11"]["image"]["3"]["#text"]
        this.song13=this.data7["recenttracks"]["track"]["12"]["image"]["3"]["#text"]
        this.song14=this.data7["recenttracks"]["track"]["13"]["image"]["3"]["#text"]
        this.song15=this.data7["recenttracks"]["track"]["14"]["image"]["3"]["#text"]
        this.song16=this.data7["recenttracks"]["track"]["15"]["image"]["3"]["#text"]
        this.song17=this.data7["recenttracks"]["track"]["16"]["image"]["3"]["#text"]
        this.song18=this.data7["recenttracks"]["track"]["17"]["image"]["3"]["#text"]
        this.song19=this.data7["recenttracks"]["track"]["18"]["image"]["3"]["#text"]
        this.song20=this.data7["recenttracks"]["track"]["19"]["image"]["3"]["#text"]
      })
      this.http.get(url8).subscribe((res)=>{
        this.data8=res
      })
    }
    })
  }
  ngOnInit(): void {

  }
  click()
  {
    window.location.href = "http://www.last.fm/api/auth/?api_key=604024e30367d14d43eda34672a72cf2&cb=http://25.83.103.75:5000/"+this.User+"/callback";
  }
  same()
  {
      if(this.Userfm!=null)
      {
        return true
      }
      return false
  }
  same2(){
      if(localStorage.getItem('user')==this.User)
      {
        return false
      }
      return true
  }
  same3(){
    if(this.Userfm==null && localStorage.getItem('user')!=this.User)
    {
      return true
    }
    return false
  }
}