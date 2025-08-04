import api from './axiosConfig';

const get = async (url) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : `Failed to fetch from ${url}`);
    }
};

export const getStats = (facilityId) => {
    const url = facilityId ? `/analytics/stats/${facilityId}` : '/analytics/stats';
    return get(url);
};

export const getTopWastedFoods = (facilityId, from, to) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const queryString = params.toString();
    const url = facilityId
        ? `/analytics/top-wasted-foods/${facilityId}?${queryString}`
        : `/analytics/top-wasted-foods?${queryString}`;
    return get(url);
};

export const getTopLossReasons = (facilityId, from, to) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const queryString = params.toString();
    const url = facilityId
        ? `/analytics/top-loss-reasons/${facilityId}?${queryString}`
        : `/analytics/top-loss-reasons?${queryString}`;
    return get(url);
};

export const getWasteTrend = (facilityId, from, to) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const queryString = params.toString();
    const url = facilityId
        ? `/analytics/waste-trend/${facilityId}?${queryString}`
        : `/analytics/waste-trend?${queryString}`;
    return get(url);
};

export const getQuickInsights = (facilityId) => {
    const url = facilityId ? `/analytics/quick-insights/${facilityId}` : '/analytics/quick-insights';
    return get(url);
};

export const getProductionEfficiency = (facilityId) => {
    const url = facilityId ? `/analytics/production-efficiency/${facilityId}` : '/analytics/production-efficiency';
    return get(url);
};

export const getOperatorEfficiency = (facilityId, from, to) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const queryString = params.toString();
    const url = facilityId
        ? `/analytics/operator-efficiency/${facilityId}?${queryString}`
        : `/analytics/operator-efficiency?${queryString}`;
    return get(url);
};

export const getVideoEvidence = (facilityId) => {
    const url = facilityId ? `/video-evidence/${facilityId}` : '/video-evidence';
    return get(url);
};

export const getComplianceData = (facilityId, from, to) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const queryString = params.toString();
    const url = facilityId
        ? `/compliance/${facilityId}?${queryString}`
        : `/compliance?${queryString}`;
    return get(url);
};

export const getTopWastedIngredientsDetailed = (facilityId, from, to) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const queryString = params.toString();
    const url = facilityId
        ? `/analytics/top-wasted-ingredients-detailed/${facilityId}?${queryString}`
        : `/analytics/top-wasted-ingredients-detailed?${queryString}`;
    return get(url);
};

export const getTopWastedIngredientsCo2 = (facilityId, from, to) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const queryString = params.toString();
    const url = facilityId
        ? `/analytics/top-wasted-ingredients-co2/${facilityId}?${queryString}`
        : `/analytics/top-wasted-ingredients-co2?${queryString}`;
    return get(url);
};
