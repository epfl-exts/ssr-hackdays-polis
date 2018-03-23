import React, { Component } from 'react';

class Tiles extends Component {
  render() {
    const st0 = {fill: '#ffed00'}
    const st1 = {fill: '#f2f2f2'}
    const st2 = {fill: '#e30613'}
    const st3 = {fill: '#3aaa35'}
    const st4 = {fill: '#3c3c3b'}
    const st5 = {fill: '#009fe3'}

    return (
      <svg version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 840 675">
      	// row 1
      	<g id="sh">
      		<rect style={st0} x="510" y="0" width="100" height="100" />
      		<rect style={st4} x="535" y="25" width="50" height="50" transform="translate(560,50), rotate(45), translate(-560,-50)" />
      	</g>
      	// row 2
      	<g id="ju">
      		<rect style={st1} x="165" y="115" width="50" height="100" />
      		<rect style={st2} x="215" y="115" width="50" height="100" />
      	</g>
      	<g id="bs-bl">
      		<rect style={st1} x="280" y="115" width="100" height="100" />
      		<rect style={st4} x="342.5" y="127.5" width="25" height="25" />
      		<rect style={st2} x="292.5" y="177.5" width="25" height="25" />
      	</g>
      	<g id="ag">
      		<rect style={st5} x="395" y="115" width="50" height="100" />
      		<rect style={st4} x="445" y="115" width="50" height="100" />
      	</g>
      	<g id="zh">
      		<polygon style={st1} points="510,115 610,115 610,215" />
      		<polygon style={st5} points="510,115 510,215 610,215" />
      	</g>
      	<g id="tg">
      		<polygon style={st1} points="625,115 725,115 725,215" />
      		<polygon style={st3} points="625,115 625,215 725,215" />
      	</g>
      	// row 2.5
      	<g id="ar-ai">
      		<rect style={st1} x="740" y="172.5" width="100" height="100" />
      		<rect style={st4} x="752.5" y="185" width="25" height="25" />
      		<rect style={st4} x="802.5" y="235" width="25" height="25" />
      	</g>
      	// row 3
      	<g id="ne">
      		<rect style={st3} x="165" y="230" width="33.3" height="100" />
      		<rect style={st2} x="198.3" y="230" width="33.3" height="100" />
      		<rect style={st1} x="231.6" y="230" width="33.3" height="100" />
      	</g>
      	<g id="so">
      		<rect style={st2} x="280" y="230" width="100" height="50" />
      		<rect style={st1} x="280" y="280" width="100" height="50" />
      	</g>
      	<g id="lu">
      		<rect style={st1} x="395" y="230" width="100" height="50" />
      		<rect style={st5} x="395" y="280" width="100" height="50" />
      	</g>
      	<g id="zg">
      		<rect style={st1} x="510" y="230" width="100" height="33.3" />
      		<rect style={st5} x="510" y="263.3" width="100" height="33.3" />
      		<rect style={st1} x="510" y="296.6" width="100" height="33.3" />
      	</g>
      	<g id="sg">
      		<rect style={st3} x="625" y="230" width="100" height="100" />
      		<rect style={st1} x="662.5" y="267.5" width="25" height="25" />
      	</g>
      	// row 4
      	<g id="vd">
      		<rect style={st1} x="50" y="345" width="100" height="50" />
      		<rect style={st3} x="50" y="395" width="100" height="50" />
      	</g>
      	<g id="fr">
      		<rect style={st1} x="165" y="345" width="100" height="50" />
      		<rect style={st4} x="165" y="395" width="100" height="50" />
      	</g>
      	<g id="be">
      		<rect style={st0} x="280" y="345" width="100" height="100" />
      		<rect style={st4} x="317.5" y="382.5" width="25" height="25" transform="translate(330,395), rotate(45), translate(-330,-395)" />
      		<polygon style={st2} points="330,345 380,345 380,395" />
      		<polygon style={st2} points="280,445 280,395 330,445" />
      	</g>
      	<g id="ow-nw">
      		<rect style={st2} x="395" y="345" width="100" height="100" />
      		<rect style={st1} x="432.5" y="382.5" width="25" height="25" transform="translate(445,395), rotate(45), translate(-445,-395)" />
      	</g>
      	<g id="sz">
      		<rect style={st2} x="510" y="345" width="100" height="100" />
      		<rect style={st1} x="585" y="345" width="25" height="25" />
      	</g>
      	<g id="gl">
      		<rect style={st2} x="625" y="345" width="100" height="100" />
      		<rect style={st4} x="662.5" y="370" width="25" height="50" />
      	</g>
      	<g id="gr">
      		<rect style={st1} x="740" y="345" width="100" height="100" />
      		<rect style={st4} x="740" y="345" width="25" height="50" />
      		<rect style={st5} x="790" y="345" width="50" height="50" />
      		<rect style={st4} x="777.5" y="407.5" width="25" height="25" />
      	</g>
      	// row 5
      	<g id="ge">
      		<rect style={st2} x="0" y="460" width="50" height="100" />
      		<rect style={st0} x="50" y="460" width="50" height="100" />
      	</g>
      	<g id="vs">
      		<rect style={st1} x="222.5" y="460" width="50" height="100" />
      		<rect style={st2} x="272.5" y="460" width="50" height="100" />
      	</g>
      	<g id="ur">
      		<rect style={st0} x="450" y="460" width="100" height="100" />
      		<rect style={st4} x="475" y="485" width="50" height="50" />
      	</g>
      	// row 6
      	<g id="ti">
      		<rect style={st5} x="450" y="575" width="100" height="50" />
      		<rect style={st2} x="450" y="625" width="100" height="50" />
      	</g>
      </svg>
    );
  }
}

export default Tiles;
