var reactimg = "https://cdn.worldvectorlogo.com/logos/react.svg"
var cssimg = "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_960_720.png"
var htmlimg = "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png"
var jsimg = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
var liquidimg = "https://www.power3designs.com/wp-content/uploads/2020/02/Shopify-Liquid.png"

class Greatings extends React.Component {
  render() {
    return (
      <div className="greatings">
        <h1>Hello, world!</h1>
        <h2>welcome to my folio</h2>
        <h2 style={{color: "red"}}>This folio is a WiP project (work in progress)</h2>
        <h2>below you will see webpages and webapps that i made during my free time or those that my client allowed me to share</h2>
      </div>
    );
  }
}

class Footer extends React.Component
{
	render() 
	{
		return (
			<div style={{width: "100vw", margin:"50px 0"}}>
			<p style={{"text-align":"center", color: "darkgrey", "font-size": "0.8rem"}}>
			this page is in react & works via [babel, react, react-dom] CDNs
			</p>
			<img src={"./logo.svg"} className="App-logo" alt="ca tourne" />
			<p style={{"text-align":"center", color: "darkgrey", "font-size": "0.7rem"}}>
			oh, and a pinch of flex css
			</p>
			</div>
			);
	}
}

class Card extends React.Component
{
	render() 
	{
		return (
			<a href={this.props.linkto} style={{margin: "15px"}}>
				<div className="card" style={{background: this.props.color}}>
					<img src={this.props.bg} className="Cardbg"/>
					<img src={this.props.lang} className="Cardlang"/>
					<p>{this.props.title}</p>
					<p className="desc">{this.props.desc}</p>
				</div>			
			</a>
			);
	}
}

class Spacer extends React.Component
{
	render() 
	{
		return (<div style={{width: "85vw", height: "3px", background: "grey", margin: "15px auto"}}> </div>);
	}
}

class App extends React.Component
{
	render()
	{
		return (
			<div>
				<Greatings/>
				<Spacer/>
				<div className="container">
					<Card linkto="#" color="#61dafba6" bg="https://via.placeholder.com/200x100" title="Hello react" desc="demo react" lang={reactimg}/>
					<Card linkto="#" color="#f7e018a6" bg="https://via.placeholder.com/200x100" title="Hello js" desc="demo js" lang={jsimg}/>
					<Card linkto="#" color="#e4642ea6" bg="https://via.placeholder.com/200x100" title="Hello html" desc="demo html" lang={htmlimg}/>
					<Card linkto="#" color="#2864f1a6" bg="https://via.placeholder.com/200x100" title="Hello css" desc="demo css" lang={cssimg}/>
					<Card linkto="https://lebonbonaupalais.com/" color="#0b09a0a6" bg="lbapbg.png" title="Le bonbon au palais" desc="an E-commerce website i made for a client" lang={liquidimg}/>
				</div>
				<Spacer/>
				<Footer/>
			</div>
		);
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

$(document).ready(function() {
  $(".animsition").animsition({
    inClass: 'fade-in-left',
    outClass: 'fade-out-left',
    inDuration: 500,
    outDuration: 500,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
});