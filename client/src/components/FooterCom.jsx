import React from 'react';
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const FooterCom = () => {
  return (
    <Footer container className='border-t-8 border-teal-500'>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-purple-600 to-gray-500 rounded-lg text-white'>
                Binara's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink href="http://www.100jsprojects.com" target="_blank" rel="noopener noreferrer">
                  100 JS Projects
                </FooterLink>
                <FooterLink href="/about" target="_blank" rel="noopener noreferrer">
                  Binara's Blog
                </FooterLink>
              </FooterLinkGroup>
            </div>

            <div>
              <FooterTitle title="Follow Me" />
              <FooterLinkGroup col>
                <FooterLink href="http://www.100jsprojects.com" target="_blank" rel="noopener noreferrer">
                  Git Hub
                </FooterLink>
                <FooterLink href="/about" target="_blank" rel="noopener noreferrer">
                  Linkdin
                </FooterLink>
              </FooterLinkGroup>
            </div>

            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                 Privacy
                </FooterLink>
                <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                  Terms & Conditions
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <hr className="my-4 border-2 border-emerald-200 dark:border-emerald-600" />
        <div className="w-full">
          <div className="block sm:flex sm:items-center sm:justify-between">
            <FooterCopyright
              href='#'
              by="Binara's Blog" 
              year={new Date().getFullYear()}
              className="text-center sm:text-left"
            />
            
            <div className="flex justify-center sm:justify-end gap-6 mt-4 sm:mt-0">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;