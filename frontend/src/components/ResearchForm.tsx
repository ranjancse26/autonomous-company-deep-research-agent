'use client';

import { useState } from 'react';
import { ResearchFormData, ResearchType } from '@/types';

interface ResearchFormProps {
  onSubmit: (data: ResearchFormData) => void;
  isLoading?: boolean;
}

const researchTypeLabels: Record<ResearchType, string> = {
  comprehensive: 'Comprehensive',
  funding: 'Funding History',
  competitors: 'Competitors',
  founders: 'Founders',
  hiring: 'Hiring',
  news: 'News',
  technology: 'Tech Stack',
};

export default function ResearchForm({ onSubmit, isLoading }: ResearchFormProps) {
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('US');
  const [researchType, setResearchType] = useState<ResearchType>('comprehensive');

  const handleTypeToggle = (type: ResearchType) => {
    setResearchType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;
    onSubmit({ company, country, researchTypes: [researchType] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Input */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
          Company Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Cursor AI, Stripe, Airbnb"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-gray-900 placeholder-gray-400"
            required
          />
        </div>
      </div>

      {/* Country Select */}
      <div>
        <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
          Region
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all appearance-none"
          >
            <option value="AF">🇦🇫 Afghanistan</option>
            <option value="AL">🇦🇱 Albania</option>
            <option value="DZ">🇩🇿 Algeria</option>
            <option value="AD">🇦🇩 Andorra</option>
            <option value="AO">🇦🇴 Angola</option>
            <option value="AG">🇦🇬 Antigua and Barbuda</option>
            <option value="AR">🇦🇷 Argentina</option>
            <option value="AM">🇦🇲 Armenia</option>
            <option value="AU">🇦🇺 Australia</option>
            <option value="AT">🇦🇹 Austria</option>
            <option value="AZ">🇦🇿 Azerbaijan</option>
            <option value="BS">🇧🇸 Bahamas</option>
            <option value="BH">🇧🇭 Bahrain</option>
            <option value="BD">🇧🇩 Bangladesh</option>
            <option value="BB">🇧🇧 Barbados</option>
            <option value="BY">🇧🇾 Belarus</option>
            <option value="BE">🇧🇪 Belgium</option>
            <option value="BZ">🇧🇿 Belize</option>
            <option value="BJ">🇧🇯 Benin</option>
            <option value="BT">🇧🇹 Bhutan</option>
            <option value="BO">🇧🇴 Bolivia</option>
            <option value="BA">🇧🇦 Bosnia and Herzegovina</option>
            <option value="BW">🇧🇼 Botswana</option>
            <option value="BR">🇧🇷 Brazil</option>
            <option value="BN">🇧🇳 Brunei</option>
            <option value="BG">🇧🇬 Bulgaria</option>
            <option value="BF">🇧🇫 Burkina Faso</option>
            <option value="BI">🇧🇮 Burundi</option>
            <option value="KH">🇰🇭 Cambodia</option>
            <option value="CM">🇨🇲 Cameroon</option>
            <option value="CA">🇨🇦 Canada</option>
            <option value="CV">🇨🇻 Cape Verde</option>
            <option value="CF">🇨🇫 Central African Republic</option>
            <option value="TD">🇹🇩 Chad</option>
            <option value="CL">🇨🇱 Chile</option>
            <option value="CN">🇨🇳 China</option>
            <option value="CO">🇨🇴 Colombia</option>
            <option value="KM">🇰🇲 Comoros</option>
            <option value="CG">🇨🇬 Congo</option>
            <option value="CR">🇨🇷 Costa Rica</option>
            <option value="HR">🇭🇷 Croatia</option>
            <option value="CU">🇨🇺 Cuba</option>
            <option value="CY">🇨🇾 Cyprus</option>
            <option value="CZ">🇨🇿 Czech Republic</option>
            <option value="CD">🇨🇩 Democratic Republic of the Congo</option>
            <option value="DK">🇩🇰 Denmark</option>
            <option value="DJ">🇩🇯 Djibouti</option>
            <option value="DM">🇩🇲 Dominica</option>
            <option value="DO">🇩🇴 Dominican Republic</option>
            <option value="EC">🇪🇨 Ecuador</option>
            <option value="EG">🇪🇬 Egypt</option>
            <option value="SV">🇸🇻 El Salvador</option>
            <option value="GQ">🇬🇶 Equatorial Guinea</option>
            <option value="ER">🇪🇷 Eritrea</option>
            <option value="EE">🇪🇪 Estonia</option>
            <option value="ET">🇪🇹 Ethiopia</option>
            <option value="FJ">🇫🇯 Fiji</option>
            <option value="FI">🇫🇮 Finland</option>
            <option value="FR">🇫🇷 France</option>
            <option value="GA">🇬🇦 Gabon</option>
            <option value="GM">🇬🇲 Gambia</option>
            <option value="GE">🇬🇪 Georgia</option>
            <option value="DE">🇩🇪 Germany</option>
            <option value="GH">🇬🇭 Ghana</option>
            <option value="GR">🇬🇷 Greece</option>
            <option value="GD">🇬🇩 Grenada</option>
            <option value="GT">🇬🇹 Guatemala</option>
            <option value="GN">🇬🇳 Guinea</option>
            <option value="GW">🇬🇼 Guinea-Bissau</option>
            <option value="GY">🇬🇾 Guyana</option>
            <option value="HT">🇭🇹 Haiti</option>
            <option value="HN">🇭🇳 Honduras</option>
            <option value="HU">🇭🇺 Hungary</option>
            <option value="IS">🇮🇸 Iceland</option>
            <option value="IN">🇮🇳 India</option>
            <option value="ID">🇮🇩 Indonesia</option>
            <option value="IR">🇮🇷 Iran</option>
            <option value="IQ">🇮🇶 Iraq</option>
            <option value="IE">🇮🇪 Ireland</option>
            <option value="IL">🇮🇱 Israel</option>
            <option value="IT">🇮🇹 Italy</option>
            <option value="JM">🇯🇲 Jamaica</option>
            <option value="JP">🇯🇵 Japan</option>
            <option value="JO">🇯🇴 Jordan</option>
            <option value="KZ">🇰🇿 Kazakhstan</option>
            <option value="KE">🇰🇪 Kenya</option>
            <option value="KI">🇰🇮 Kiribati</option>
            <option value="KW">🇰🇼 Kuwait</option>
            <option value="KG">🇰🇬 Kyrgyzstan</option>
            <option value="LA">🇱🇦 Laos</option>
            <option value="LV">🇱🇻 Latvia</option>
            <option value="LB">🇱🇧 Lebanon</option>
            <option value="LS">🇱🇸 Lesotho</option>
            <option value="LR">🇱🇷 Liberia</option>
            <option value="LY">🇱🇾 Libya</option>
            <option value="LI">🇱🇮 Liechtenstein</option>
            <option value="LT">🇱🇹 Lithuania</option>
            <option value="LU">🇱🇺 Luxembourg</option>
            <option value="MG">🇲🇬 Madagascar</option>
            <option value="MW">🇲🇼 Malawi</option>
            <option value="MY">🇲🇾 Malaysia</option>
            <option value="MV">🇲🇻 Maldives</option>
            <option value="ML">🇲🇱 Mali</option>
            <option value="MT">🇲🇹 Malta</option>
            <option value="MH">🇲🇭 Marshall Islands</option>
            <option value="MR">🇲🇷 Mauritania</option>
            <option value="MU">🇲🇺 Mauritius</option>
            <option value="MX">🇲🇽 Mexico</option>
            <option value="FM">🇫🇲 Micronesia</option>
            <option value="MD">🇲🇩 Moldova</option>
            <option value="MC">🇲🇨 Monaco</option>
            <option value="MN">🇲🇳 Mongolia</option>
            <option value="ME">🇲🇪 Montenegro</option>
            <option value="MA">🇲🇦 Morocco</option>
            <option value="MZ">🇲🇿 Mozambique</option>
            <option value="MM">🇲🇲 Myanmar</option>
            <option value="NA">🇳🇦 Namibia</option>
            <option value="NR">🇳🇷 Nauru</option>
            <option value="NP">🇳🇵 Nepal</option>
            <option value="NL">🇳🇱 Netherlands</option>
            <option value="NZ">🇳🇿 New Zealand</option>
            <option value="NI">🇳🇮 Nicaragua</option>
            <option value="NE">🇳🇪 Niger</option>
            <option value="NG">🇳🇬 Nigeria</option>
            <option value="KP">🇰🇵 North Korea</option>
            <option value="MK">🇲🇰 North Macedonia</option>
            <option value="NO">🇳🇴 Norway</option>
            <option value="OM">🇴🇲 Oman</option>
            <option value="PK">🇵🇰 Pakistan</option>
            <option value="PW">🇵🇼 Palau</option>
            <option value="PA">🇵🇦 Panama</option>
            <option value="PG">🇵🇬 Papua New Guinea</option>
            <option value="PY">🇵🇾 Paraguay</option>
            <option value="PE">🇵🇪 Peru</option>
            <option value="PH">🇵🇭 Philippines</option>
            <option value="PL">🇵🇱 Poland</option>
            <option value="PT">🇵🇹 Portugal</option>
            <option value="QA">🇶🇦 Qatar</option>
            <option value="RO">🇷🇴 Romania</option>
            <option value="RU">🇷🇺 Russia</option>
            <option value="RW">🇷🇼 Rwanda</option>
            <option value="KN">🇰🇳 Saint Kitts and Nevis</option>
            <option value="LC">🇱🇨 Saint Lucia</option>
            <option value="VC">🇻🇨 Saint Vincent and the Grenadines</option>
            <option value="WS">🇼🇸 Samoa</option>
            <option value="SM">🇸🇲 San Marino</option>
            <option value="ST">🇸🇹 Sao Tome and Principe</option>
            <option value="SA">🇸🇦 Saudi Arabia</option>
            <option value="SN">🇸🇳 Senegal</option>
            <option value="RS">🇷🇸 Serbia</option>
            <option value="SC">🇸🇨 Seychelles</option>
            <option value="SL">🇸🇱 Sierra Leone</option>
            <option value="SG">🇸🇬 Singapore</option>
            <option value="SK">🇸🇰 Slovakia</option>
            <option value="SI">🇸🇮 Slovenia</option>
            <option value="SB">🇸🇧 Solomon Islands</option>
            <option value="SO">🇸🇴 Somalia</option>
            <option value="ZA">🇿🇦 South Africa</option>
            <option value="KR">🇰🇷 South Korea</option>
            <option value="SS">🇸🇸 South Sudan</option>
            <option value="ES">🇪🇸 Spain</option>
            <option value="LK">🇱🇰 Sri Lanka</option>
            <option value="SD">🇸🇩 Sudan</option>
            <option value="SR">🇸🇷 Suriname</option>
            <option value="SE">🇸🇪 Sweden</option>
            <option value="CH">🇨🇭 Switzerland</option>
            <option value="SY">🇸🇾 Syria</option>
            <option value="TW">🇹🇼 Taiwan</option>
            <option value="TJ">🇹🇯 Tajikistan</option>
            <option value="TZ">🇹🇿 Tanzania</option>
            <option value="TH">🇹🇭 Thailand</option>
            <option value="TL">🇹🇱 Timor-Leste</option>
            <option value="TG">🇹🇬 Togo</option>
            <option value="TO">🇹🇴 Tonga</option>
            <option value="TT">🇹🇹 Trinidad and Tobago</option>
            <option value="TN">🇹🇳 Tunisia</option>
            <option value="TR">🇹🇷 Turkey</option>
            <option value="TM">🇹🇲 Turkmenistan</option>
            <option value="TV">🇹🇻 Tuvalu</option>
            <option value="UG">🇺🇬 Uganda</option>
            <option value="UA">🇺🇦 Ukraine</option>
            <option value="AE">🇦🇪 United Arab Emirates</option>
            <option value="GB">🇬🇧 United Kingdom</option>
            <option value="US">🇺🇸 United States</option>
            <option value="UY">🇺🇾 Uruguay</option>
            <option value="UZ">🇺🇿 Uzbekistan</option>
            <option value="VU">🇻🇺 Vanuatu</option>
            <option value="VA">🇻🇦 Vatican City</option>
            <option value="VE">🇻🇪 Venezuela</option>
            <option value="VN">🇻🇳 Vietnam</option>
            <option value="YE">🇾🇪 Yemen</option>
            <option value="ZM">🇿🇲 Zambia</option>
            <option value="ZW">🇿🇼 Zimbabwe</option>
          </select>
        </div>
      </div>

      {/* Research Types */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Research Types
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(researchTypeLabels) as ResearchType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeToggle(type)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${researchType === type
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${researchType === type ? 'bg-blue-500' : 'bg-gray-200'
                  }`}>
                  {researchType === type && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm font-medium ${researchType === type ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                  {researchTypeLabels[type]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !company.trim()}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-xl"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Researching...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Start Research</span>
          </>
        )}
      </button>
    </form>
  );
}