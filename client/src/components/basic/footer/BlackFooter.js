import React from 'react';

const BlackFooter = () => {
    return (
        <>
            <footer>
                <div className='footer-container'>
                    <div>
                        고객센터 070-2021-3012
                    </div>
                    <div>
                        월~금 9:00 ~ 17:00
                    </div>
                    <div>
                        <a
                            href="https://github.com/codestates/Code-High/wiki"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ cursor: 'pointer' }}
                        >
                            Wiki
                        </a>
                    </div>
                    <div>
                        <strong>Contact</strong>
                        <a
                            href="https://github.com/loverduck"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Yoo So-yeon
                        </a>
                        |
                        <a
                            href="https://github.com/james-taeil"
                            target="_blank"
                            rel="noopener noreferrer"                    
                        >
                            Kim Tae-il
                        </a>
                        |
                        <a
                            href="https://github.com/cue28"
                            target="_blank"
                            rel="noopener noreferrer"
                            
                        >
                            Jeon Si-yoon
                        </a>
                        |
                        <a
                            href="https://github.com/soowan-jang"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Jang Soo-wan
                        </a>
                    </div>
                    <div>
                        &copy;2021 슬기로운 코딩생활 all right reserved.
                    </div>
                </div>
            </footer>
        </>  
    );
};

export default BlackFooter;