// Rates are centralized here for easy modification (exact values below)
const RATES = {
    Construction: { 'Labour Only': 350, 'Material + Labour': 1500 },
    Interior: { 'Labour Only': 350, 'Material + Labour': 1200 },
    Painting: { 'Labour Only': 50, 'Material + Labour': 100 },
    'Tile Work': { 'Labour Only': 30, 'Material + Labour': 100 }
};

function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

function getSelectedRate(workType, costType) {
    if (!RATES[workType] || RATES[workType][costType] === undefined) return 0;
    return RATES[workType][costType];
}

function updateDisplays() {
    const workType = document.getElementById('workType').value;
    const costType = document.getElementById('costType').value;
    const area = parseFloat(document.getElementById('areaInput').value) || 0;

    const rate = getSelectedRate(workType, costType);
    const total = Math.round(area * rate);

    const rateDisplay = document.getElementById('rateDisplay');
    const totalDisplay = document.getElementById('totalDisplay');

    rateDisplay.textContent = `${formatINR(rate)} / sq. ft.`;
    totalDisplay.textContent = formatINR(total);

    // Prepare breakdown for pie chart: use selected cost type across components
    const components = ['Construction', 'Interior', 'Painting', 'Tile Work'];
    const breakdown = components.map(key => {
        const r = getSelectedRate(key, costType);
        return { label: key, cost: Math.round(area * r) };
    });

    // Render chart and numeric breakdown
    renderCostBreakdownChart(breakdown);
}

// Chart handling
let costChart = null;
function renderCostBreakdownChart(breakdown) {
    const ctx = document.getElementById('costBreakdownChart');
    if (!ctx) return;

    const labels = breakdown.map(b => b.label);
    const data = breakdown.map(b => b.cost);

    // Destroy previous chart if exists
    if (costChart) {
        try { costChart.destroy(); } catch (e) { /* ignore */ }
    }

    const colors = ['#d4af37', '#bda283', '#8b5e34', '#6b7280'];

    costChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: '#0f172a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#d1d5db' } },
                tooltip: { callbacks: { label: function(ctx) { return ctx.label + ': ' + formatINR(ctx.parsed); } } }
            }
        }
    });

    // Numeric breakdown list
    const breakdownList = document.getElementById('breakdownList');
    if (breakdownList) {
        breakdownList.innerHTML = '';
        breakdown.forEach(item => {
            const el = document.createElement('div');
            el.className = 'flex justify-between items-center gap-2';
            el.innerHTML = `<span class="text-sm text-gray-300">${item.label}</span><span class="font-bold">${formatINR(item.cost)}</span>`;
            breakdownList.appendChild(el);
        });
    }
    // Show combined total below the chart
    const totalSum = data.reduce((a, b) => a + b, 0);
    const breakdownTotalEl = document.getElementById('breakdownTotal');
    if (breakdownTotalEl) {
        breakdownTotalEl.textContent = `Combined Total: ${formatINR(totalSum)}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const workTypeEl = document.getElementById('workType');
    const costTypeEl = document.getElementById('costType');
    const areaEl = document.getElementById('areaInput');
    const calcBtn = document.getElementById('calcBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Initialize displays
    updateDisplays();

    // Dynamic updates on change/input
    workTypeEl.addEventListener('change', updateDisplays);
    costTypeEl.addEventListener('change', updateDisplays);
    areaEl.addEventListener('input', updateDisplays);

    // Calculate button triggers the same update (keeps UX consistent)
    calcBtn.addEventListener('click', function (e) {
        e.preventDefault();
        updateDisplays();
        // Scroll to result for emphasis
        document.getElementById('totalDisplay').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        workTypeEl.value = 'Construction';
        costTypeEl.value = 'Labour Only';
        areaEl.value = '';
        updateDisplays();
    });
});
