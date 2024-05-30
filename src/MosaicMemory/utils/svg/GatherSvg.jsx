import React from 'react'

const GatherSvg = ({name, color, title}) => {
    const colorModeCode = color ? color : 'var(--baseFg)';
    const colorModeCode2 = color ? color : 'var(--baseRGB_b)';
    
    const svgIcons = [
        {
            name: 'message',
            svgIcon: () => (
                <svg aria-label={title} fill='none' stroke={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <rect x="0.794" y="3.88" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="25.413" height="19.24"/>
                    <path stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M0.793,3.88l11.771,9.986c0.539,0.458,1.331,0.458,1.871,0L26.207,3.88"/>
                </svg>
            ),
        },
        {
            name: 'alarm',
            svgIcon: () => (
                <svg aria-label={title} fill={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <g>
                        <path d="M22.504,20.902h-1.443V10.691c0-4.169-3.392-7.56-7.56-7.56S5.94,6.522,5.94,10.691v10.211H4.496V10.691 c0-4.964,4.039-9.003,9.004-9.003s9.004,4.039,9.004,9.003V20.902z"/>
                        <rect x="1.824" y="20.902" width="23.351" height="1.443"/>
                        <rect x="12.779" y="0.131" width="1.443" height="3"/>
                        <path d="M13.5,26.869c-1.974,0-3.581-1.606-3.581-3.581v-2.387h1.443v2.387c0,1.178,0.959,2.137,2.138,2.137 s2.138-0.959,2.138-2.137v-2.387h1.443v2.387C17.081,25.263,15.474,26.869,13.5,26.869z"/>
                    </g>
                </svg>
            ),
        },
        {
            name: 'light',
            svgIcon: () => (
                <svg aria-label={title} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <circle fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" cx="13.5" cy="13.5" r="6.429"/>
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" d="M13.5,1.78c0,0.845,0,2.012,0,2.012
                        S13.5,2.624,13.5,1.78s0-1.529,0-1.529S13.5,0.935,13.5,1.78z"/>
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" d="M5.212,5.212C5.81,5.81,6.635,6.635,6.635,6.635
                        S5.81,5.81,5.212,5.212S4.131,4.131,4.131,4.131S4.615,4.615,5.212,5.212z"/>
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" d="M1.78,13.5c0.845,0,2.012,0,2.012,0
                        S2.624,13.5,1.78,13.5s-1.529,0-1.529,0S0.935,13.5,1.78,13.5z"/>
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" d="M5.212,21.788
                        c0.597-0.597,1.422-1.422,1.422-1.422S5.81,21.19,5.212,21.788s-1.081,1.081-1.081,1.081S4.615,22.385,5.212,21.788z"/>
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" d="M13.5,25.22c0-0.845,0-2.012,0-2.012
                        S13.5,24.376,13.5,25.22s0,1.529,0,1.529S13.5,26.065,13.5,25.22z"/>
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" d="M21.788,21.788
                        c-0.597-0.597-1.422-1.422-1.422-1.422S21.19,21.19,21.788,21.788s1.081,1.081,1.081,1.081S22.385,22.385,21.788,21.788z"/>
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" d="M25.22,13.5c-0.845,0-2.012,0-2.012,0
                        S24.376,13.5,25.22,13.5s1.529,0,1.529,0S26.065,13.5,25.22,13.5z"/>
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.75" strokeMiterlimit="10" d="M21.788,5.212
                        c-0.597,0.597-1.422,1.422-1.422,1.422S21.19,5.81,21.788,5.212s1.081-1.081,1.081-1.081S22.385,4.615,21.788,5.212z"/>
                </svg>
            ),
        },
        {
            name: 'dark',
            svgIcon: () => (
                <svg aria-label={title} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27" >
                    <path fill="none" stroke={colorModeCode} strokeWidth="1.35" strokeMiterlimit="10" d="M9.506,6.908c0-1.923,0.521-3.721,1.417-5.276 C5.601,2.873,1.632,7.637,1.632,13.337c0,6.644,5.386,12.031,12.031,12.031c5.7,0,10.464-3.969,11.706-9.291 c-1.554,0.896-3.353,1.417-5.276,1.417C14.246,17.494,9.506,12.754,9.506,6.908z"/>
                </svg>
            ),
        },
        {
            name: 'search',
            svgIcon: () => (
                <svg aria-label={title} fill="none" stroke={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <circle stroke-width="1.35" stroke-miterlimit="10" cx="12.133" cy="12.133" r="11.339"/>
		            <line stroke-width="1.35" stroke-miterlimit="10" x1="20.15" y1="20.15" x2="26.206" y2="26.206"/>
                </svg>
            ),
        },
        {
            name: 'delBtn',
            svgIcon: () => (
                <svg aria-label={title} x="0px" y="0px" fill={colorModeCode2} viewBox="0 0 30 30" enableBackground="new 0 0 30 30">
                    <path d="M0,0v30h30V0H0z M23.242,20.768l-2.475,2.475L15,17.474l-5.768,5.768l-2.475-2.475L12.525,15L6.757,9.232l2.475-2.475 L15,12.525l5.768-5.768l2.475,2.475L17.474,15L23.242,20.768z"/>
                </svg>
            ),
        },
        {
            name: 'profile',
            svgIcon: () => (
                <svg aria-label={title} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <g>
                        <path fill={colorModeCode2} d="M13.5,1.812c3.53,0,6.402,2.872,6.402,6.402c0,1.588-0.593,3.115-1.671,4.3l-1.317,1.448l1.797,0.778 c3.696,1.601,6.085,5.235,6.085,9.258v1.189H2.205v-1.189c0-4.023,2.388-7.657,6.085-9.258l1.797-0.778l-1.317-1.448 c-1.078-1.185-1.671-2.712-1.671-4.3C7.098,4.684,9.97,1.812,13.5,1.812 M13.5,0.412c-4.309,0-7.802,3.493-7.802,7.802 c0,2.021,0.775,3.856,2.035,5.242c-4.075,1.765-6.928,5.819-6.928,10.543v2.589h25.39v-2.589c0-4.724-2.853-8.778-6.928-10.543 c1.26-1.386,2.035-3.221,2.035-5.242C21.302,3.905,17.809,0.412,13.5,0.412L13.5,0.412z"/>
                    </g>
                </svg>
            ),
        },
        {
            name: 'rock',
            svgIcon: () => (
                <svg aria-label={title} fill={colorModeCode2} x="0px" y="0px" viewBox="0 0 26 26" enableBackground="new 0 0 26 26">
                    <g>
                        <path d="M19.22,10.822V6.517c0-3.48-2.831-6.312-6.312-6.312c-3.48,0-6.312,2.832-6.312,6.312v4.312l-4.994,0.002v14.964h18.694 v-1.5H3.103V12.33l19.793-0.009v11.974h-2.611v1.5h4.111V10.82L19.22,10.822z M8.097,6.517c0-2.653,2.158-4.812,4.812-4.812 s4.812,2.158,4.812,4.812v4.306l-9.623,0.005V6.517H8.097z"/>
                        <path d="M14.291,16.722c0-0.764-0.619-1.383-1.383-1.383s-1.383,0.619-1.383,1.383c0,0.52,0.29,0.967,0.715,1.203h-0.082v3.737h1.5 v-3.737h-0.082C14,17.69,14.291,17.242,14.291,16.722z"/>
                    </g>
                </svg>
            )
        },
        {
            name: 'openEye',
            svgIcon: () => (
                <svg aria-label={title}  x="0px" y="0px" viewBox="0 0 27 27" fill={colorModeCode2} enableBackground="new 0 0 27 27">
                    <g>
                        <g>
                            <path d="M13.5,6.333c4.939,0,9.476,5,11.115,7.177c-1.614,2.147-6.159,7.157-11.115,7.157c-5.14,0-9.8-5.074-11.229-7.154 C3.725,11.422,8.427,6.333,13.5,6.333 M13.5,4.333C6.044,4.333,0,12.885,0,13.5c0,0.677,6.044,9.167,13.5,9.167S27,13.808,27,13.5 C27,13.254,20.956,4.333,13.5,4.333L13.5,4.333z"/>
                        </g>
                        <circle cx="13.5" cy="13.549" r="5.337"/>
                    </g>
                </svg>
            )
        },
        {
            name: 'closeEye',
            svgIcon: () => (
                <svg aria-label={title} x="0px" y="0px" viewBox="0 0 27 27" fill={colorModeCode2} enableBackground="new 0 0 27 27">
                    <g>
                        <path d="M13.5,6.333c4.939,0,9.476,5,11.115,7.177c-0.744,0.99-2.117,2.587-3.861,4.023l1.504,1.356 C25.156,16.438,27,13.67,27,13.5c0-0.246-6.044-9.167-13.5-9.167c-2.021,0-3.931,0.639-5.652,1.567l1.594,1.437 C10.727,6.73,12.098,6.333,13.5,6.333z"/>
                        <path d="M18.466,15.471c0.231-0.598,0.371-1.242,0.371-1.921c0-2.948-2.389-5.337-5.337-5.337c-0.875,0-1.688,0.231-2.417,0.604 l1.312,1.183c0.351-0.109,0.718-0.185,1.105-0.185c2.063,0,3.736,1.672,3.736,3.736c0,0.255-0.026,0.504-0.075,0.745L18.466,15.471 z"/>
                        <path d="M20.068,18.073l-2-1.802l-1.218-1.098l-5.313-4.789l-1.218-1.097L8.623,7.757L7.053,6.343l-4.12-3.714l-0.034-0.03 L1.56,4.085l3.807,3.432C2.112,10.018,0,13.137,0,13.5c0,0.677,6.044,9.167,13.5,9.167c2.318,0,4.499-0.858,6.405-2.047 l4.195,3.781l0.576-0.639l0.763-0.847l-3.861-3.48L20.068,18.073z M13.5,20.667c-5.14,0-9.8-5.074-11.229-7.154 c0.769-1.105,2.451-3.045,4.611-4.632l2.087,1.881c-0.501,0.813-0.805,1.762-0.805,2.788c0,2.948,2.389,5.337,5.337,5.337 c1.224,0,2.338-0.428,3.238-1.121l1.606,1.448C16.844,20.072,15.198,20.667,13.5,20.667z"/>
                    </g>
                </svg>
            )
        },
        {
            name: 'loading',
            svgIcon: () => (
                <svg aria-label={title} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <g>
                        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-365.4299" y1="-362.4738" x2="-343.029" y2="-362.2312" gradientTransform="matrix(0 -1 1 0 369.202 -343.202)">
                            <stop  offset="0" style={{ stopColor: '#292A2A' }}/>
                            <stop  offset="1" style={{ stopColor: 'var(--baseFg)' }}/>
                        </linearGradient>
                        <path fill="url(#SVGID_1_)" d="M0,13.5C0,20.944,6.056,27,13.5,27v-3.781c-5.359,0-9.719-4.36-9.719-9.719 c0-5.359,4.36-9.719,9.719-9.719V0C6.056,0,0,6.056,0,13.5z"/>
                            <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="-365.5745" y1="-349.1208" x2="-343.1736" y2="-348.8782" gradientTransform="matrix(0 -1 1 0 369.202 -343.202)">
                                <stop  offset="0" style={{ stopColor: '#292A2A' }}/>
                                <stop  offset="1" style={{ stopColor: 'var(--baseBg)' }}/>
                            </linearGradient>
                        <path fill="url(#SVGID_2_)" d="M23.219,13.5c0,5.359-4.36,9.719-9.719,9.719V27C20.944,27,27,20.944,27,13.5S20.944,0,13.5,0v3.781 C18.859,3.781,23.219,8.141,23.219,13.5z"/>
                    </g>
                </svg>
            )
        },
        {
            name: 'logout',
            svgIcon: () => (
                <svg aria-label={title} stroke={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <g>
                        <g>
                            <rect x="831" y="607.099" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="66" height="42"/>
                            <path fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d=" M850.198,606.643v-9.939c0-7.624,6.18-13.803,13.803-13.803l0,0c7.623,0,13.802,6.18,13.802,13.803v9.939"/>
                        </g>
                        
                        <line fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="858" y1="628" x2="870" y2="628"/>
                    </g>
                    <g>
                        <rect x="831" y="607.099" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="66" height="42"/>
                        <path fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M850.198,606.643v-9.939c0-7.624,6.18-13.803,13.803-13.803l0,0c7.623,0,13.802,6.18,13.802,13.803v9.939"/>
                    </g>
                    <line fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="858" y1="628" x2="870" y2="628"/>
                    <polyline fill="none" strokeWidth="1.4" strokeLinejoin="round" strokeMiterlimit="10" points="18.835,20.206 18.835,24.979 1.002,24.979 1.002,2.021 18.835,2.021 18.835,7.106 "/>
                    <path fill="none" strokeWidth="1.4" strokeMiterlimit="10" d="M22.507,16.798"/>
                    <line fill="none" strokeWidth="1.4" strokeMiterlimit="10" x1="10.136" y1="13.553" x2="25.752" y2="13.553"/>
                    <polyline fill="none" strokeWidth="1.4" strokeMiterlimit="10" points="22.478,10.226 25.752,13.5 
                        22.478,16.774 "/>
                </svg>
            )
        },
        {
            name: 'setting',
            svgIcon: () => (
                <svg aria-label={title} stroke={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <circle cx="12" cy="12" fill="none" r="8.635" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                    <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
            )
        },
        {
            name: 'arrow',
            svgIcon: () => (
                <svg aria-label={title} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27" >
                    <polyline fill="none" stroke={colorModeCode} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="
                    1,7.75 13.5,19.25 26,7.75 "/>
                </svg>
            )
        },
        {
            name: 'home',
            svgIcon: () => (
                <svg aria-label={title} fill='none' stroke={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <polygon strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="
                    13.5,0.793 0.793,9.763 0.793,26.207 9.795,26.207 9.795,15.655 17.205,15.655 17.205,26.207 26.207,26.207 26.207,9.763 "/>
                </svg>
            )
        },
        {
            name: 'menu',
            svgIcon: () => (
                <svg aria-label={title} fill="none" stroke={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <g>
                        <line strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="25.567" y1="3.917" x2="1.433" y2="3.917"/>

                        <line strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="25.567" y1="13.515" x2="1.433" y2="13.515"/>

                        <line strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="25.567" y1="23.083" x2="1.433" y2="23.083"/>
                    </g>
                </svg>
            )
        },
        {
            name: 'plus',
            svgIcon: () => (
                <svg aria-label={title} fill='none' stroke={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <line stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="0.793" y1="13.5" x2="26.207" y2="13.5"/>
                    <line stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="26.207" x2="13.5" y2="0.793"/>
                </svg>
            )
        },
        {
            name: 'schedule',
            svgIcon: () => (
                <svg aria-label={title} fill='none' stroke={colorModeCode} x="0px" y="0px" viewBox="0 0 27 27" enableBackground="new 0 0 27 27">
                    <rect x="0.793" y="3.032" fill="none" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="25.414" height="23.165"/>
                    <line fill="none" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="0.793" y1="11.131" x2="26.207" y2="11.131"/>
                    <line fill="none" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="7.724" y1="0.809" x2="7.724" y2="5.685"/>
                    <line fill="none" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="19.276" y1="0.809" x2="19.276" y2="5.685"/>
                    <polyline fill="none" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
                        18.934,15.169 13.158,20.945 9.564,17.736 "/>
                </svg>
            )
        },
    ]

    //name에 해당하는 아이콘 찾기
    const icon = svgIcons.find(icon => icon.name === name);

    if(icon) {
        return icon.svgIcon();
    } else {
        return null;
    }
}

export default GatherSvg;