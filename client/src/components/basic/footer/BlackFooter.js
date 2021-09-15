import React from 'react';

const BlackFooter = () => {
    return (
            <div className='black-footer-container'>
                <h1>
                    고객센터 070-2021-3012
                </h1>
                <h2>
                    월~금 9:00 ~ 17:00
                </h2>
                <div className="wiki">
                    <a
                        href="https://github.com/codestates/Code-High/wiki"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Wiki
                    </a> 
                </div>
                <div>
                    <strong>Contact &nbsp;</strong>
                    <a
                        href="https://github.com/loverduck"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Yoo So-yeon &nbsp;
                    </a>
                    |
                    <a
                        href="https://github.com/james-taeil"
                        target="_blank"
                        rel="noopener noreferrer"                    
                    >
                        &nbsp; Kim Tae-il &nbsp;
                    </a>
                    |
                    <a
                        href="https://github.com/cue28"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        &nbsp; Jeon Si-yoon &nbsp;
                    </a>
                    |
                    <a
                        href="https://github.com/soowan-jang"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        &nbsp; Jang Soo-wan &nbsp;
                    </a>
                </div>
                <div>
                    &copy;2021 슬기로운 코딩생활 all right reserved.
                </div>
            </div>
    
    );
};

export default BlackFooter;